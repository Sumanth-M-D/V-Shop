import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
  wishlistItems: [
    {
      productId: { type: mongoose.Schema.ObjectId, ref: "Product" },
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A wishlist must belong to a user"],
  },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
