import { Product } from "../models/index.js";
import AppError from "../utils/appError.js";

async function getProducts(req, res, next) {
  try {
    const { category, search } = req.query;
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
      return next(new AppError(`No products found${ category && " of that category"}.`, 404));
    }

    res.status(200).json({
      status: "success",
      data: { products },
      pagination: {
        total,
        page,
        limit,
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getAllCategories(req, res, next) {
  try {
    const categories = await Product.distinct("category");
    res.status(200).json({
      status: "success",
      data: { categories: categories },
    });
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    const productId = req.params.id;
    const product = await Product.find({ productId }).lean();

    if (!product) next(new AppError("No product found", 404));

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
  getAllCategories,
};

export default productsController;
