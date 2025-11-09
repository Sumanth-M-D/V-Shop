import type { NextFunction, Request, Response } from "express";
import { Product } from "../models/index.js";
import AppError from "../utils/appError.js";

type ProductQuery = {
  category?: string;
  subCategory?: string;
  $text?: {
    $search: string;
  };
};

function normalizeQueryParam(param: string | string[] | undefined): string | undefined {
  if (Array.isArray(param)) {
    return param[0];
  }
  return param;
}

async function getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const category = normalizeQueryParam(req.query.category as string | string[] | undefined);
    const subCategory = normalizeQueryParam(req.query.subCategory as string | string[] | undefined);
    const search = normalizeQueryParam(req.query.search as string | string[] | undefined);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const query: ProductQuery = {
      ...(category ? { category } : {}),
      ...(subCategory ? { subCategory } : {}),
      ...(search ? { $text: { $search: search } } : {}),
    };
    const projection: Record<string, unknown> = search ? { score: { $meta: "textScore" } } : {};

    const productQuery = Product.find(query, projection);

    if (search) {
      productQuery.sort({ score: { $meta: "textScore" } });
    }

    const total = await Product.countDocuments(query);
    const products = await productQuery.skip(skip).limit(limit).lean();

    if (!products.length) {
      const errorMessage = search
        ? "No products found for this search"
        : `No products found${category ? " of that category" : ""}${subCategory ? " and subcategory" : ""}.`;
      next(new AppError(errorMessage, 404));
      return;
    }

    res.status(200).json({
      status: "success",
      data: { products },
      pagination: {
        total,
        page,
        limit,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ productId }).lean();

    if (!product) {
      next(new AppError("No product found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      data: { product },
    });
  } catch (err) {
    next(err);
  }
}

const productsController = {
  getProducts,
  getProduct,
};

export default productsController;
