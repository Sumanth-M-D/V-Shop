import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";

async function createCart(userId, next) {
  try {
    return await Cart.create({ userId });
  } catch (err) {
    next(err);
  }
}

async function getCartItems(req, res, next) {
  try {
    const userCart = await Cart.findById(req.user.cartId).populate({
      path: "cartItems.productId", // Specify the path to populate
      select: "category id image price rating title", // Select specific fields to populate
    });

    if (!userCart) {
      next(new AppError("Cart not found", 404));
    }

    console.log(userCart);
    res.status(200).json({
      status: "success",
      data: userCart,
    });
  } catch (err) {
    next(err);
  }
}

async function addCartItem(req, res, next) {
  try {
    const { productId, quantity } = req.body;
    const cartId = req.user.cartId;

    if (!productId || !quantity || quantity < 1) {
      return next(
        new AppError(
          "Product Id and quantity are needed to add the product to cart",
          400
        )
      );
    }

    // Checking if the product exist wiith that id
    const product = await Product.findById(productId);

    if (!product) {
      return next(
        new AppError("Invalid product Id. Enter a valid product Id", 400)
      );
    }

    const userCart = await Cart.findById(cartId);
    if (!userCart) {
      return next(new AppError("Cart not found", 400));
    }

    let productIndex = -1;
    if (userCart.cartItems.length > 0) {
      productIndex = userCart.cartItems.findIndex(
        (item) => item?.productId.toString() === productId.toString()
      );
    }

    if (productIndex === -1) {
      userCart.cartItems.push({ productId, quantity });
    } else {
      userCart.cartItems[productIndex].quantity += quantity;
    }

    await userCart.save();

    res.status(201).json({
      status: "success",
      data: userCart,
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
    const { cartId } = req.user;

    const userCart = await Cart.findById(cartId);

    const filteredCart = userCart.cartItems.filter(
      (item) => item?.productId.toString() !== productId.toString()
    );

    if (filteredCart.length === userCart.cartItems.length) {
      return next(new AppError("Product not found in the cart", 400));
    }

    userCart.cartItems = filteredCart;
    await userCart.save();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
}

async function updateCartItem(req, res, next) {
  try {
    const { productId, quantity } = req.body;
    const { cartId } = req.user;

    if (!productId || !quantity || quantity < 0) {
      next(new AppError("Please enter productId and quantity", 400));
    }

    const userCart = await Cart.findById(cartId);

    if (!userCart) {
      return next(new AppError("Cart not found", 404));
    }

    console.log(userCart);

    userCart.cartItems = userCart.cartItems.map((ele) => {
      return ele?.productId.toString() === productId.toString()
        ? { productId, quantity }
        : ele;
    });

    await userCart.save();

    res.status(200).json({
      status: "success",
      data: userCart,
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