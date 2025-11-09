import { Schema, model, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

const subCategorySchema = new Schema(
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

const categorySchema = new Schema(
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
      required: true,
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

export type SubCategory = InferSchemaType<typeof subCategorySchema>;
export type Category = InferSchemaType<typeof categorySchema>;
export type CategoryDocument = HydratedDocument<Category>;
export type CategoryModel = Model<CategoryDocument>;

export const Category = model<CategoryDocument>("Category", categorySchema);
