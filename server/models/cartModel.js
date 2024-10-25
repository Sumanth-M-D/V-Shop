import mongoose from "mongoose";
import User from "./userModel.js";

const cartSchema = mongoose.Schema({
  cartItems: [
    {
      productId: { type: mongoose.Schema.ObjectId, ref: "Product" },
      quantity: { type: Number, min: 1 },
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A cart must belong to a user"],
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
