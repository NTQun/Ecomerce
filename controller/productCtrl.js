const Product = require("../models/productModel");
const Warehouse = require("../models/warehoueModel");
const Order = require("../models/orderModel");

const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  validateMongoDbId(id);
  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id)
      .populate("color")
      .populate("ratings.postedby");
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);

    const rateProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        $push: {
          ratings: {
            star: star,
            comment: comment,
            postedby: _id,
          },
        },
      },
      {
        new: true,
      }
    );
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

const createWareProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Warehouse.findOne({ product: id });
    const updateProdcut = await Product.findByIdAndUpdate(
      id,
      { isWarehouse: true },
      { new: true }
    );
    if (!findProduct) {
      const newWareProduct = await Warehouse.create({
        product: id,
      });
      res.json(newWareProduct);
    } else res.json("Product already in warehouse");
  } catch (error) {
    throw new Error(error);
  }
});

const getWarehouse = asyncHandler(async (req, res) => {
  try {
    const getWarehouse = await Warehouse.find().populate("product");
    res.json(getWarehouse);
  } catch (error) {
    throw new Error(error);
  }
});
const getAWarehouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getWarehouse = await Warehouse.findById(id).populate("product");
    res.json(getWarehouse);
  } catch (error) {
    throw new Error(error);
  }
});

const importWarehouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, importprice, price } = req.body;
  validateMongoDbId(id);
  try {
    const updateWarehouse = await Warehouse.findById(id);
    const productId = updateWarehouse.product;
    const product = await Product.findById(productId);

    product.quantity = quantity
      ? product.quantity + quantity
      : product.quantity;
    product.importprice = importprice ? importprice : product.importprice;
    product.price = price ? price : product.price;
    product.save();

    updateWarehouse.quantity = quantity
      ? updateWarehouse.quantity + quantity
      : updateWarehouse.quantity;
    updateWarehouse.importprice = importprice
      ? importprice
      : updateWarehouse.importprice;
    updateWarehouse.price = price ? price : updateWarehouse.price;
    updateWarehouse.save();

    product.quantity = updateWarehouse.quantity;
    product.importprice = updateWarehouse.importprice;
    product.price = updateWarehouse.price;
    product.save();
    res.json(updateWarehouse);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProductWarehouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletewh = await Warehouse.findByIdAndDelete(id);
    res.json(deletewh);
  } catch (error) {
    throw new Error(error);
  }
});

const updateQuantityOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  validateMongoDbId(id);
  console.log(quantity);
  try {
    const updateWarehouse = await Warehouse.findOne({ product: id });
    updateWarehouse.quantity = updateWarehouse.quantity - quantity;
    updateWarehouse.save();
    const product = await Product.findById(id);
    product.quantity = product.quantity - quantity;
    product.save();

    res.json(updateWarehouse);
  } catch (error) {
    throw new Error(error);
  }
});
const updateQuantityCancel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  validateMongoDbId(id);
  try {
    const updateWarehouse = await Warehouse.findOne({ product: id });
    updateWarehouse.quantity = updateWarehouse.quantity + quantity;
    updateWarehouse.save();

    const product = await Product.findById(id);
    product.quantity = product.quantity + quantity;
    product.save();
    res.json(updateWarehouse);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  createWareProduct,
  getWarehouse,
  // updateWarehouse,
  importWarehouse,
  getAWarehouse,
  deleteProductWarehouse,
  updateQuantityCancel,
  updateQuantityOrder,
};
