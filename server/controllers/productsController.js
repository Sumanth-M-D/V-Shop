import { Product } from "../models/index.js";
import AppError from "../utils/appError.js";

async function getProducts(req, res, next) {
  try {
    const { category, subCategory, search } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    let products;

    let query = {};
    let projection = {};
    let sort = {};
    if (category) {
      query.category = category;
    }
    if (subCategory) {
      query.subCategory = subCategory;
    }
    if (search) {
      query.$text = { $search: search };
      projection.score = { $meta: "textScore" };
      sort = { score: { $meta: "textScore" } };
    }

    // Get total count for pagination
    const total = await Product.countDocuments(query);
    products = await Product.find(query, projection)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    if (products.length === 0) {
      const errorMessage = search
        ? "No products found for this search"
        : `No products found${category && " of that category"}${
            subCategory && " and subcategory"
          }.`;
      return next(new AppError(errorMessage, 404));
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

async function getProduct(req, res, next) {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ productId }).lean();

    if (!product) {
      return next(new AppError("No product found", 404));
    }

    res.status(200).json({
      status: "success",
      data: { product: product },
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
