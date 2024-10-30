import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";

// Create a new wishlist for a user
async function createWishlist(userId, next) {
  try {
    return await Wishlist.create({ userId });
  } catch (err) {
    next(err);
  }
}

// Retrieve all items in the user's wishlist
async function getWishlistItems(req, res, next) {
  try {
    // Find the user's wishlist using the stored wishlist ID
    const userWishlist = await Wishlist.findById(req.user.wishlistId).lean();
    if (!userWishlist) {
      next(new AppError("wishlist not found", 404));
    }

    // Respond with a success status and the wishlist data
    res.status(200).json({
      status: "success",
      data: { wishlist: userWishlist },
    });
  } catch (err) {
    next(err);
  }
}

// Add a product to the user's wishlist
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
    const product = await Product.findById(productId).lean();

    if (!product) {
      return next(
        new AppError("Invalid product Id. Enter a valid product Id", 400)
      );
    }

    // Find the user's wishlist using the wishlist ID
    const userWishlist = await Wishlist.findById(wishlistId);
    if (!userWishlist) {
      return next(new AppError("wishlist not found", 400));
    }

    // Check if the product is already in the wishlist
    let productIndex = -1;
    if (userWishlist.wishlistItems.length > 0) {
      productIndex = userWishlist.wishlistItems.findIndex(
        (item) => item?.product.id.toString() === productId.toString()
      );
    }

    // If the product is already in the wishlist, trigger an error
    if (productIndex !== -1) {
      return next(new AppError("Item is already in the wishlist"));
    }

    // Add the product to the wishlist and save the changes
    userWishlist.wishlistItems.push({ product: productId });
    await userWishlist.save();

    await userWishlist.populate({
      path: "wishlistItems.product", // Specify the path to populate
      select: "id image price title", // Select specific fields to populate
    });

    res.status(201).json({
      status: "success",
      data: { wishlist: userWishlist },
    });
  } catch (err) {
    next(err);
  }
}

// Remove a product from the user's wishlist
async function deleteWishlistItem(req, res, next) {
  try {
    const { productId } = req.body;
    if (!productId) {
      return next(new AppError("Please provide a valid Product Id", 400));
    }
    const { wishlistId } = req.user;

    // Find the user's wishlist using the wishlist ID
    const userWishlist = await Wishlist.findById(wishlistId);

    // Filter out the product from the wishlist items
    const filteredwishlist = userWishlist.wishlistItems.filter(
      (item) => item?.product._id.toString() !== productId.toString()
    );

    // If the filtered wishlist is the same length as the original, the product was not found
    if (filteredwishlist.length === userWishlist.wishlistItems.length) {
      return next(new AppError("Product not found in the wishlist", 400));
    }

    // Update the wishlist items with the filtered list and save changes
    userWishlist.wishlistItems = filteredwishlist;
    await userWishlist.save();

    // Respond with a success status and the updated wishlist
    res.status(200).json({
      status: "success",
      data: {
        wishlist: userWishlist,
      },
    });
  } catch (err) {
    next(err);
  }
}

// Export the wishlist controller functions as an object for use in routes
const wishlistController = {
  createWishlist,
  getWishlistItems,
  addWishlistItem,
  deleteWishlistItem,
};

export default wishlistController;
