import mongoose from "mongoose";
import IdGenerator from "../utils/idGenerator.js";

const productSchema = mongoose.Schema(
  {
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
    subCategory: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    tags: {
      type: [String],
    },
    image: {
      type: [String],
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
    productId: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

productSchema.index(
  {
    title: "text",
    description: "text",
    type: "text",
    category: "text",
    tags: "text",
  },
  { weights: { title: 5, category: 3, type: 3, tags: 2, description: 1 } }
);
export const Product = mongoose.model("Product", productSchema);
