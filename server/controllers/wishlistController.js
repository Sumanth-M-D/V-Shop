import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";

async function createWishlist(userId, next) {
  try {
    return await Wishlist.create({ userId });
  } catch (err) {
    next(err);
  }
}

async function getWishlistItems(req, res, next) {
  try {
    const userWishlist = await Wishlist.findById(req.user.wishlistId).populate({
      path: "wishlistItems.productId", // Specify the path to populate
      select: "category id image price rating title", // Select specific fields to populate
    });

    if (!userWishlist) {
      next(new AppError("wishlist not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: { wishlist: userWishlist },
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

    // Checking if the product exist wiith that id
    const product = await Product.findById(productId);

    if (!product) {
      return next(
        new AppError("Invalid product Id. Enter a valid product Id", 400)
      );
    }

    const userWishlist = await Wishlist.findById(wishlistId);
    if (!userWishlist) {
      return next(new AppError("wishlist not found", 400));
    }

    let productIndex = -1;
    if (userWishlist.wishlistItems.length > 0) {
      productIndex = userWishlist.wishlistItems.findIndex(
        (item) => item?.productId.toString() === productId.toString()
      );
    }

    if (productIndex !== -1) {
      return next(new AppError("Item is already added to wishlist"));
    }

    userWishlist.wishlistItems.push({ productId });
    await userWishlist.save();

    res.status(201).json({
      status: "success",
      data: { wishlist: userWishlist },
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
    const { wishlistId } = req.user;

    const userWishlist = await Wishlist.findById(wishlistId);

    const filteredwishlist = userWishlist.wishlistItems.filter(
      (item) => item?.productId.toString() !== productId.toString()
    );

    if (filteredwishlist.length === userWishlist.wishlistItems.length) {
      return next(new AppError("Product not found in the wishlist", 400));
    }

    userWishlist.wishlistItems = filteredwishlist;
    await userWishlist.save();

    res.status(204).json({
      status: "success",
      data: null,
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
