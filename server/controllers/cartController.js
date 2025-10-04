import { Cart, Product } from "../models/index.js";
import AppError from "../utils/appError.js";
import IdGenerator from "../utils/idGenerator.js";

// Helper function to populate cart items with product details and quantity
async function getCartProducts(userCart) {
  if (!userCart || !userCart.cartItems) return [];
  const productIds = userCart.cartItems.map((item) => item.productId);
  const cartProducts = await Product.find(
    { productId: { $in: productIds } },
    { productId: 1, image: 1, price: 1, title: 1 }
  );
  return cartProducts.map(product => {
    const item = userCart.cartItems.find(i => i.productId === product.productId);
    return { ...product.toObject(), quantity: item ? item.quantity : 0 };
  });
}

async function createCart(req, res, next) {
  try {
    const cartId = IdGenerator.getCartId();
    await Cart.create({ userId: req.user.userId, cartId, cartItems: [] });
    return res.status(201).json({
      status: "success",
      data: { cartId },
    });
  } catch (err) {
    next(err);
  }
}

async function getCartItems(req, res, next) {
  try {
    const userCart = await Cart.findOne({ cartId: req.user.cartId }).lean();
    if (!userCart) {
      return next(new AppError("Cart not found", 404));
    }
    // Get product details for all items in cart
    const cartItems = await getCartProducts(userCart);
    res.status(200).json({
      status: "success",
      data: { cart: cartItems },
    });
  } catch (err) {
    next(err);
  }
}

async function addCartItem(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body;
    const cartId = req.user.cartId;
    if (!productId) {
      return next(new AppError("Product Id and quantity are needed to add a product to cart", 400));
    }
    const product = await Product.findOne({ productId }).lean();
    if (!product) {
      return next(new AppError("Invalid product Id. Enter a valid product Id", 400));
    }
    const userCart = await Cart.findOne({ cartId });
    if (!userCart) {
      return next(new AppError("Cart not found", 400));
    }
    const existingItem = userCart.cartItems.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      userCart.cartItems.push({ productId, quantity });
    }
    await userCart.save();
    // Return updated cart items
    const cartItems = await getCartProducts(userCart);
    res.status(201).json({
      status: "success",
      data: { cart: cartItems },
    });
  } catch (err) {
    next(err);
  }
}

async function deleteCartItem(req, res, next) {
  try {
    const { productId } = req.body;
    if (!productId) {
      return next(new AppError("Please provide a valid Product Id", 400));
    }

    const product = await Product.findOne({ productId }).lean();
    if (!product) {
      return next(new AppError("Invalid product Id. Enter a valid product Id", 400));
    }

    const { cartId } = req.user;
    const userCart = await Cart.findOne({ cartId });
    if (!userCart) {
      return next(new AppError("Cart not found", 400));
    }

    const filteredCart = userCart.cartItems.filter((item) => item.productId !== productId);
    if (filteredCart.length === userCart.cartItems.length) {
      return next(new AppError("Product not found in the cart", 400));
    }

    userCart.cartItems = filteredCart;
    await userCart.save();

    const cartItems = await getCartProducts(userCart);
    res.status(200).json({
      status: "success",
      data: { cart: cartItems },
    });
  } catch (err) {
    next(err);
  }
}

async function updateCartItem(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body;
    const { cartId } = req.user;
    
    if (!productId) {
      return next(new AppError("Please enter productId and valid quantity", 400));
    }
    const product = await Product.findOne({ productId }).lean();
    if (!product) {
      return next(new AppError("Invalid product Id. Enter a valid product Id", 400));
    }

    const userCart = await Cart.findOne({ cartId });
    if (!userCart) {
      return next(new AppError("Cart not found", 404));
    }

    const existingItem = userCart.cartItems.find((item) => item.productId === productId);
    if (!existingItem) {
      return next(new AppError("Item not found in the cart", 404));
    }

    existingItem.quantity = quantity;
    await userCart.save();

    const cartItems = await getCartProducts(userCart);
    res.status(200).json({
      status: "success",
      data: { cart: cartItems },
    });
  } catch (err) {
    next(err);
  }
}

const cartController = {
  createCart,
  getCartItems,
  addCartItem,
  deleteCartItem,
  updateCartItem,
};

export default cartController;
