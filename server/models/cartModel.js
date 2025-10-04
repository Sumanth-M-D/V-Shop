import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  cartItems: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, min: 1 },
    },
  ],
  userId: {
    type: String,
    required: [true, "A cart must belong to a user"],
  },
  cartId: {
    type: String,
    unique: true,
    index: true,
  },
}, { timestamps: true });

cartSchema.index({ userId: 1 });

export const Cart = mongoose.model("Cart", cartSchema);
