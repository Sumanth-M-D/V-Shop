import mongoose from "mongoose";

// Defining the schema for the shopping cart
const cartSchema = mongoose.Schema({
  // Array of items in the cart
  cartItems: [
    {
      product: { type: mongoose.Schema.ObjectId, ref: "Product" }, // Reference to the Product model
      quantity: { type: Number, min: 1 }, // Quantity of the product, must be at least 1
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId, // Reference to the User model
    ref: "User",
    required: [true, "A cart must belong to a user"], // Validation to ensure a user ID is provided
  },
});

// Middleware to automatically populate product details when querying carts
cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "cartItems.product", // Specify the path to populate
    select: "id image price title", // Select specific fields to populate
  });
  next();
});

// Create the Cart model based on the defined schema
const Cart = mongoose.model("Cart", cartSchema);

// Exports the Cart model for use in other files
export default Cart;
