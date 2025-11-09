import type { NextFunction, Request, Response } from "express";
import { Product, Wishlist } from "../models/index.js";
import type { WishlistDocument } from "../models/index.js";
import IdGenerator from "../utils/idGenerator.js";
import AppError from "../utils/appError.js";

async function createWishlist(userId: string): Promise<WishlistDocument> {
  const wishlistId = IdGenerator.getWishlistId();
  return Wishlist.create({
    userId,
    wishlistId,
    wishlistItems: [],
  });
}

function ensureAuthenticatedUser(
  req: Request
): asserts req is Request & { user: NonNullable<Request["user"]> } {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }
}

type WishlistItemSnapshot = { productId: string };

async function getWishlistProducts(
  wishlistItems: WishlistItemSnapshot[]
): Promise<Array<Record<string, unknown>>> {
  if (!wishlistItems.length) {
    return [];
  }

  const productIds = wishlistItems.map((item) => item.productId);

  return Product.find(
    { productId: { $in: productIds } },
    { productId: 1, image: 1, price: 1, title: 1 }
  ).lean();
}

async function getWishlistItems(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    ensureAuthenticatedUser(req);

    const wishlist = await Wishlist.findOne({ wishlistId: req.user.wishlistId });
    if (!wishlist) {
      next(new AppError("wishlist not found", 404));
      return;
    }

    const wishlistProducts = await getWishlistProducts(wishlist.wishlistItems);

    res.status(200).json({
      status: "success",
      data: { wishlist: wishlistProducts },
    });
  } catch (err) {
    next(err);
  }
}

async function addWishlistItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    ensureAuthenticatedUser(req);

    const { productId } = req.body as { productId?: string };
    const { wishlistId } = req.user;

    if (!productId) {
      next(new AppError("Product Id is needed to add the product to wishlist", 400));
      return;
    }

    const product = await Product.findOne({ productId }).lean();
    if (!product) {
      next(new AppError("Invalid product Id. Enter a valid product Id", 400));
      return;
    }

    const wishlist = await Wishlist.findOne({ wishlistId });
    if (!wishlist) {
      next(new AppError("wishlist not found", 400));
      return;
    }

    const exists = wishlist.wishlistItems.some((item) => item.productId === productId);
    if (exists) {
      next(new AppError("Item is already in the wishlist", 400));
      return;
    }

    wishlist.wishlistItems.push({ productId });
    await wishlist.save();

    const wishlistProducts = await getWishlistProducts(wishlist.wishlistItems);
    res.status(201).json({
      status: "success",
      data: { wishlist: wishlistProducts },
    });
  } catch (err) {
    next(err);
  }
}

async function deleteWishlistItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    ensureAuthenticatedUser(req);

    const { productId } = req.body as { productId?: string };
    if (!productId) {
      next(new AppError("Please provide a valid Product Id", 400));
      return;
    }

    const { wishlistId } = req.user;
    const wishlist = await Wishlist.findOne({ wishlistId });
    if (!wishlist) {
      next(new AppError("wishlist not found", 400));
      return;
    }

    const filteredWishlist = wishlist.wishlistItems.filter((item) => item.productId !== productId);
    if (filteredWishlist.length === wishlist.wishlistItems.length) {
      next(new AppError("Product not found in the wishlist", 400));
      return;
    }

    wishlist.set("wishlistItems", filteredWishlist);
    await wishlist.save();

    const wishlistProducts = await getWishlistProducts(wishlist.wishlistItems);
    res.status(200).json({
      status: "success",
      data: { wishlist: wishlistProducts },
    });
  } catch (err) {
    next(err);
  }
}

const wishlistController = {
  createWishlist,
  getWishlistItems,
  addWishlistItem,
  deleteWishlistItem,
};

export default wishlistController;
