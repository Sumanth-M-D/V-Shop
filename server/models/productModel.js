import mongoose from "mongoose";

// Sample product object structure for reference (commented out)
// const sample = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: {
//     rate: 3.9,
//     count: 120,
//   },
// };

// Defining the schema for the Product model
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
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
  image: {
    type: String,
    required: true,
  },
  rating: {
    rate: {
      type: Number,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },

  id: {
    type: String,
    unique: true,
  },
});

// Pre-save middleware to set `id` as the string version of `_id`
productSchema.pre("save", function (next) {
  if (this.isNew) {
    // Only set it on new documents
    this.id = this._id.toString();
  }
  next();
});

// Exporting the Product model
const Product = mongoose.model("Product", productSchema);
export default Product;
