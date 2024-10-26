import mongoose from "mongoose";
import User from "./userModel.js";

const cartSchema = mongoose.Schema({
  cartItems: [
    {
      product: { type: mongoose.Schema.ObjectId, ref: "Product" },
      quantity: { type: Number, min: 1 },
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A cart must belong to a user"],
  },
});

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "cartItems.product", // Specify the path to populate
    select: "id image price title", // Select specific fields to populate
  });
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
