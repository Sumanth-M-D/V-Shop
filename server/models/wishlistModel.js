import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
  wishlistItems: [
    {
      product: { type: mongoose.Schema.ObjectId, ref: "Product" },
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A wishlist must belong to a user"],
  },
});

wishlistSchema.pre(/^find/, function (next) {
  this.populate({
    path: "wishlistItems.product", // Specify the path to populate
    select: "id image price title", // Select specific fields to populate
  });
  next();
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
