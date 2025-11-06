import mongoose from "mongoose";
import IdGenerator from "../utils/idGenerator.js";

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    formattedName: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    formattedName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    subCategories: {
      type: [subCategorySchema],
      required: true,
    },
    categoryId: {
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Text search index for category name
categorySchema.index(
  {
    name: "text",
    formattedName: "text",
  },
  { weights: { name: 5, formattedName: 3 } }
);

export const Category = mongoose.model("Category", categorySchema);
