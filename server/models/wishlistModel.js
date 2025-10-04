import mongoose from "mongoose";
import IdGenerator from "../utils/idGenerator.js";

const wishlistSchema = mongoose.Schema({
  wishlistItems: [
    {
      productId: { type: String },
    },
  ],
  userId: {
    type: String,
    required: [true, "A wishlist must belong to a user"],
  },
  wishlistId: {
    type: String,
    unique: true,
    index: true,
  },
},
{ timestamps: true });

wishlistSchema.index({ userId: 1 });

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);