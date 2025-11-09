import { Schema, model, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

const cartSchema = new Schema(
  {
    cartItems: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, min: 1, default: 1 },
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
      required: true,
    },
  },
  { timestamps: true }
);

cartSchema.index({ userId: 1 });

export type Cart = InferSchemaType<typeof cartSchema>;
export type CartItem = Cart["cartItems"][number];
export type CartDocument = HydratedDocument<Cart>;
export type CartModel = Model<CartDocument>;

export const Cart = model<CartDocument>("Cart", cartSchema);
