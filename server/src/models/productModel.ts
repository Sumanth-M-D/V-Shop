import { Schema, model, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

const productSchema = new Schema(
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
      required: true,
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

export type Product = InferSchemaType<typeof productSchema>;
export type ProductDocument = HydratedDocument<Product>;
export type ProductModel = Model<ProductDocument>;

export const Product = model<ProductDocument>("Product", productSchema);
