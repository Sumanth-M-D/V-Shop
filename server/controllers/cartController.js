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
    // Find the user's cart by the cart ID stored in the user object
    const userCart = await Cart.findById(req.user.cartId);

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
          "Product Id and quantity are needed to add the product to cart",
          400
        )
      );
    }

    // Check if the product exists in the database
    const product = await Product.findById(productId);
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

    // Check if the product already exists in the cart
    let productIndex = -1;
    if (userCart.cartItems.length > 0) {
      productIndex = userCart.cartItems.findIndex(
        (item) => item?.product.id.toString() === productId.toString()
      );
    }

    // Add new product or update quantity if it already exists in the cart
    if (productIndex === -1) {
      userCart.cartItems.push({ product: productId, quantity });
    } else {
      userCart.cartItems[productIndex].quantity += quantity;
    }
    await userCart.save();

    // Retrieve the updated cart
    const updatedCart = await Cart.findById(cartId);

    // Respond with the updated cart data
    res.status(201).json({
      status: "success",
      data: { cart: updatedCart },
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

    // Retrieve the updated cart, populated with product details
    const updatedCart = await Cart.findById(cartId);

    // Respond with the updated cart data
    res.status(200).json({
      status: "success",
      data: {
        cart: updatedCart,
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

    // Check if the item to update exists in the cart
    if (
      userCart.cartItems.findIndex((item) => item.product.id === productId) ===
      -1
    ) {
      return next(new AppError("Item is not found in the cart", 404));
    }

    // Update the item quantity in the cart
    userCart.cartItems = userCart.cartItems.map((ele) => {
      return ele?.product.id.toString() === productId.toString()
        ? { product: productId, quantity }
        : ele;
    });

    await userCart.save();

    // Retrieve the updated cart
    const updatedCart = await Cart.findById(cartId);

    // Respond with the updated cart data
    res.status(200).json({
      status: "success",
      data: { cart: updatedCart },
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
