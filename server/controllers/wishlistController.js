import { Wishlist, Product } from "../models/index.js";
import AppError from "../utils/appError.js";
import IdGenerator from "../utils/idGenerator.js";

async function createWishlist(userId, next) {
  try {
    const wishlistId = IdGenerator.getWishlistId();
    return await Wishlist.create({ userId, wishlistId, wishlistItems: [] });
  } catch (err) {
    next(err);
  }
}

// Helper function to populate wishlist items with product details
async function getWishlistProducts(userWishlist) {
  if (!userWishlist || !userWishlist.wishlistItems) return [];
  const productIds = userWishlist.wishlistItems.map((item) => item.productId);
  return await Product.find(
    { productId: { $in: productIds } },
    { productId: 1, image: 1, price: 1, title: 1 }
  );
}

async function getWishlistItems(req, res, next) {
  try {
    const userWishlist = await Wishlist.findOne({ wishlistId: req.user.wishlistId }).lean();
    if (!userWishlist) {
      return next(new AppError("wishlist not found", 404));
    }
    // Get product details for all items in wishlist
    const wishlistProducts = await getWishlistProducts(userWishlist);
    res.status(200).json({
      status: "success",
      data: { wishlist: wishlistProducts },
    });
  } catch (err) {
    next(err);
  }
}

async function addWishlistItem(req, res, next) {
  try {
    const { productId } = req.body;
    const wishlistId = req.user.wishlistId;
    if (!productId) {
      return next(
        new AppError("Product Id is needed to add the product to wishlist", 400)
      );
    }
    const product = await Product.findOne({ productId }).lean();
    if (!product) {
      return next(
        new AppError("Invalid product Id. Enter a valid product Id", 400)
      );
    }
    const userWishlist = await Wishlist.findOne({ wishlistId });
    if (!userWishlist) {
      return next(new AppError("wishlist not found", 400));
    }
    const exists = userWishlist.wishlistItems.some(
      (item) => item.productId === productId
    );
    if (exists) {
      return next(new AppError("Item is already in the wishlist"));
    }
    userWishlist.wishlistItems.push({ productId });
    await userWishlist.save();

    const wishlistProducts = await getWishlistProducts(userWishlist);
    res.status(201).json({
      status: "success",
      data: { wishlist: wishlistProducts },
    });
  } catch (err) {
    next(err);
  }
}

async function deleteWishlistItem(req, res, next) {
  try {
    const { productId } = req.body;
    if (!productId) {
      return next(new AppError("Please provide a valid Product Id", 400));
    }
    const product = await Product.findOne({ productId }).lean();
    if (!product) {
      return next(new AppError("Invalid product Id. Enter a valid product Id", 400));
    }
    const { wishlistId } = req.user;
    const userWishlist = await Wishlist.findOne({ wishlistId });
    if (!userWishlist) {
      return next(new AppError("wishlist not found", 400));
    }
    const filteredWishlist = userWishlist.wishlistItems.filter(
      (item) => item.productId !== productId
    );
    if (filteredWishlist.length === userWishlist.wishlistItems.length) {
      return next(new AppError("Product not found in the wishlist", 400));
    }
    userWishlist.wishlistItems = filteredWishlist;
    await userWishlist.save();
    // Return updated wishlist items
    const wishlistProducts = await getWishlistProducts(userWishlist);
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
