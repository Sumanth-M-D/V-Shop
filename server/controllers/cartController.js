import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";

// Function to create a new cart for a user
async function createCart(userId, next) {
  try {
    return await Cart.create({ userId });
  } catch (err) {
    next(err);
  }
}

// Function to retrieve items in the user's cart
async function getCartItems(req, res, next) {
  try {
    // Find the user's cart by the cart ID (lean() => returns plain javascript object )
    const userCart = await Cart.findById(req.user.cartId).lean();

    if (!userCart) {
      next(new AppError("Cart not found", 404));
    }

    // Respond with the cart data
    res.status(200).json({
      status: "success",
      data: { cart: userCart },
    });
  } catch (err) {
    next(err);
  }
}

// Function to add an item to the user's cart
async function addCartItem(req, res, next) {
  try {
    // Extract product ID and quantity from the request body
    const { productId, quantity } = req.body;
    const cartId = req.user.cartId;

    // Validate input data
    if (!productId || !quantity || quantity < 1) {
      return next(
        new AppError(
          "Product Id and quantity are needed to add a product to cart",
          400
        )
      );
    }

    // Check if the product exists in the database
    const product = await Product.findById(productId).lean();
    if (!product) {
      return next(
        new AppError("Invalid product Id. Enter a valid product Id", 400)
      );
    }

    // Retrieve the user's cart
    const userCart = await Cart.findById(cartId);
    if (!userCart) {
      return next(new AppError("Cart not found", 400));
    }

    const existingItem = userCart.cartItems.find(
      (item) => item?.product.id.toString() === productId.toString()
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      userCart.cartItems.push({ product: productId, quantity });
    }
    await userCart.save();

    // Populate the product details for each item in the cart
    await userCart.populate({
      path: "cartItems.product", // Specify the path to populate
      select: "id image price title", // Select specific fields to populate
    });

    // Respond with the updated cart data
    res.status(201).json({
      status: "success",
      data: { cart: userCart },
    });
  } catch (err) {
    next(err);
  }
}

// Function to delete an item from the user's cart
async function deleteCartItem(req, res, next) {
  try {
    // Extract product ID from the request body
    const { productId } = req.body;
    if (!productId) {
      return next(new AppError("Please provide a valid Product Id", 400));
    }

    // Get the user's cart ID and Retrieve the user's cart
    const { cartId } = req.user;
    const userCart = await Cart.findById(cartId);

    // Filter out the item to be deleted
    const filteredCart = userCart.cartItems.filter(
      (item) => item?.product._id.toString() !== productId.toString()
    );

    // Handle case where the product was not found in the cart
    if (filteredCart.length === userCart.cartItems.length) {
      return next(new AppError("Product not found in the cart", 400));
    }

    // Update the cart items to exclude the deleted item
    userCart.cartItems = filteredCart;
    await userCart.save();

    // Respond with the updated cart data
    res.status(200).json({
      status: "success",
      data: {
        cart: userCart,
      },
    });
  } catch (err) {
    next(err);
  }
}

// Function to update the quantity of an item in the user's cart
async function updateCartItem(req, res, next) {
  try {
    // Extract product ID and quantity from the request body
    const { productId, quantity } = req.body;
    const { cartId } = req.user; // Get the user's cart ID

    // Validate input data
    if (!productId || !quantity || quantity < 0) {
      return next(new AppError("Please enter productId and quantity", 400));
    }

    // Retrieve the user's cart and Handle case where cart is not found
    const userCart = await Cart.findById(cartId);
    if (!userCart) {
      return next(new AppError("Cart not found", 404));
    }

    // Update the item quantity in the cart if the item exists in the cart
    const existingItem = userCart.cartItems.find(
      (item) => item.product.id.toString() === productId
    );
    if (!existingItem) {
      return next(new AppError("Item not found in the cart", 404));
    }

    existingItem.quantity = quantity;

    await userCart.save();

    // Respond with the updated cart data
    res.status(200).json({
      status: "success",
      data: { cart: userCart },
    });
  } catch (err) {
    next(err);
  }
}

// Exporting cart controller functions for use in other parts of the application
const cartController = {
  createCart,
  getCartItems,
  addCartItem,
  deleteCartItem,
  updateCartItem,
};

export default cartController;
