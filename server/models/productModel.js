import mongoose from "mongoose";


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

productSchema.pre("save", function (next) {
  if (this.isNew) {
    this.id = this._id.toString();
  }
  next();
});

productSchema.index({ title: "text", category: 1 });
const Product = mongoose.model("Product", productSchema);
export default Product;
