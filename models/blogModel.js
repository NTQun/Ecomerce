const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    images: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.techtarget.com%2Fwhatis%2Fdefinition%2Fweblog&psig=AOvVaw0hRNCqkF3ZhQQ0BvIsPcXE&ust=1673754202281000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIDDwLeSxvwCFQAAAAAdAAAAABAE",
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  {
    toJSON: {
      virtualsL: true,
    },
    toObject: {
      virtuals: true,
    },
    timestampse: true,
  }
);

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
