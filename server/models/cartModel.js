import mongoose from "mongoose";

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
    path: "cartItems.product",
    select: "id image price title",
  });
  next();
});

cartSchema.index({ userId: 1 });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
