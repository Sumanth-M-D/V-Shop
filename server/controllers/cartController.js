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
    const userCart = await Cart.findById(req.user.cartId).lean();

    if (!userCart) {
      next(new AppError("Cart not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: { cart: userCart },
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
          "Product Id and quantity are needed to add a product to cart",
          400
        )
      );
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return next(
        new AppError("Invalid product Id. Enter a valid product Id", 400)
      );
    }

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

    await userCart.populate({
      path: "cartItems.product",
      select: "id image price title",
    });

    res.status(201).json({
      status: "success",
      data: { cart: userCart },
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
      (item) => item?.product._id.toString() !== productId.toString()
    );

    if (filteredCart.length === userCart.cartItems.length) {
      return next(new AppError("Product not found in the cart", 400));
    }

    userCart.cartItems = filteredCart;
    await userCart.save();

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

async function updateCartItem(req, res, next) {
  try {
    const { productId, quantity } = req.body;
    const { cartId } = req.user;

    if (!productId || !quantity || quantity < 0) {
      return next(new AppError("Please enter productId and quantity", 400));
    }

    const userCart = await Cart.findById(cartId);
    if (!userCart) {
      return next(new AppError("Cart not found", 404));
    }

    const existingItem = userCart.cartItems.find(
      (item) => item.product.id.toString() === productId
    );
    if (!existingItem) {
      return next(new AppError("Item not found in the cart", 404));
    }

    existingItem.quantity = quantity;
    await userCart.save();

    res.status(200).json({
      status: "success",
      data: { cart: userCart },
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
