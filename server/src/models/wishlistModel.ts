import { Schema, model, type HydratedDocument, type InferSchemaType, type Model } from "mongoose";

const wishlistSchema = new Schema(
  {
    wishlistItems: [
      {
        productId: { type: String, required: true },
      },
    ],
    userId: {
      type: String,
      required: [true, "A wishlist must belong to a user"],
    },
    wishlistId: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
  },
  { timestamps: true }
);

wishlistSchema.index({ userId: 1 });

type WishlistSchemaShape = InferSchemaType<typeof wishlistSchema>;

export type Wishlist = WishlistSchemaShape;
export type WishlistItem = Wishlist["wishlistItems"][number];
export type WishlistDocument = HydratedDocument<Wishlist>;
export type WishlistModel = Model<WishlistDocument>;

export const Wishlist = model<WishlistDocument>("Wishlist", wishlistSchema);
