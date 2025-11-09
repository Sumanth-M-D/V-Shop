import type { NextFunction, Request, Response } from "express";
import { Cart, Product } from "../models/index.js";
import IdGenerator from "../utils/idGenerator.js";
import AppError from "../utils/appError.js";

type CartItemSnapshot = { productId: string; quantity: number };
type CartProduct = Record<string, unknown> & { quantity: number };

function ensureAuthenticatedUser(
  req: Request
): asserts req is Request & { user: NonNullable<Request["user"]> } {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }
}

async function getCartProducts(cartItems: CartItemSnapshot[]): Promise<CartProduct[]> {
  if (!cartItems.length) {
    return [];
  }

  const productIds = cartItems.map((item) => item.productId);
  const quantityByProductId = new Map(cartItems.map((item) => [item.productId, item.quantity]));

  const products = await Product.find(
    { productId: { $in: productIds } },
    { productId: 1, image: 1, price: 1, title: 1 }
  ).lean();

  return products.map((product) => {
    const quantity = quantityByProductId.get(product.productId) ?? 0;
    return {
      ...product,
      quantity,
    };
  });
}

async function createCart(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    ensureAuthenticatedUser(req);
    const cartId = IdGenerator.getCartId();
    await Cart.create({ userId: req.user.userId, cartId, cartItems: [] });

    return res.status(201).json({
      status: "success",
      data: { cartId },
    });
  } catch (err) {
    next(err);
    return undefined;
  }
}

async function getCartItems(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    ensureAuthenticatedUser(req);
    const cart = await Cart.findOne({ cartId: req.user.cartId });

    if (!cart) {
      next(new AppError("Cart not found", 404));
      return;
    }

    const cartItems = await getCartProducts(cart.cartItems);
    res.status(200).json({
      status: "success",
      data: { cart: cartItems },
    });
  } catch (err) {
    next(err);
  }
}

async function addCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    ensureAuthenticatedUser(req);

    const { productId } = req.body as { productId?: string };
    const quantity = Number((req.body as { quantity?: number }).quantity ?? 1);
    const { cartId } = req.user;

    if (!productId) {
      next(new AppError("Product Id and quantity are needed to add a product to cart", 400));
      return;
    }

    const product = await Product.findOne({ productId }).lean();
    if (!product) {
      next(new AppError("Invalid product Id. Enter a valid product Id", 400));
      return;
    }

    const cart = await Cart.findOne({ cartId });
    if (!cart) {
      next(new AppError("Cart not found", 400));
      return;
    }

    const existingItem = cart.cartItems.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.cartItems.push({ productId, quantity });
    }

    await cart.save();

    const cartItems = await getCartProducts(cart.cartItems);
    res.status(201).json({
      status: "success",
      data: { cart: cartItems },
    });
  } catch (err) {
    next(err);
  }
}

async function deleteCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    ensureAuthenticatedUser(req);

    const { productId } = req.body as { productId?: string };
    if (!productId) {
      next(new AppError("Please provide a valid Product Id", 400));
      return;
    }

    const { cartId } = req.user;
    const cart = await Cart.findOne({ cartId });
    if (!cart) {
      next(new AppError("Cart not found", 400));
      return;
    }

    const filteredItems = cart.cartItems.filter((item) => item.productId !== productId);
    if (filteredItems.length === cart.cartItems.length) {
      next(new AppError("Product not found in the cart", 400));
      return;
    }

    cart.set("cartItems", filteredItems);
    await cart.save();

    const cartItems = await getCartProducts(cart.cartItems);
    res.status(200).json({
      status: "success",
      data: { cart: cartItems },
    });
  } catch (err) {
    next(err);
  }
}

async function updateCartItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    ensureAuthenticatedUser(req);

    const { productId } = req.body as { productId?: string };
    const quantity = Number((req.body as { quantity?: number }).quantity ?? 1);
    const { cartId } = req.user;

    if (!productId) {
      next(new AppError("Please enter productId and valid quantity", 400));
      return;
    }

    const product = await Product.findOne({ productId }).lean();
    if (!product) {
      next(new AppError("Invalid product Id. Enter a valid product Id", 400));
      return;
    }

    const cart = await Cart.findOne({ cartId });
    if (!cart) {
      next(new AppError("Cart not found", 404));
      return;
    }

    const itemToUpdate = cart.cartItems.find((item) => item.productId === productId);
    if (!itemToUpdate) {
      next(new AppError("Item not found in the cart", 404));
      return;
    }

    itemToUpdate.quantity = quantity;
    await cart.save();

    const cartItems = await getCartProducts(cart.cartItems);
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
