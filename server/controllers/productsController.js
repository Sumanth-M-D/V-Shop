import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";
import sanitizeText from "../utils/sanitizeText.js";

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      data: { products: products },
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
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) next(new AppError("No product found", 404));

    res.status(200).json({
      status: "success",
      data: { product: product },
    });
  } catch (err) {
    next(err);
  }
}

async function getProductsOfCategory(req, res, next) {
  try {
    const { category } = req.params;

    const productsOfCategory = await Product.find({ category });

    if (productsOfCategory.length === 0) {
      return next(new AppError("No products found of that category", 404));
    }

    res
      .status(200)
      .json({ status: "success", data: { products: productsOfCategory } });
  } catch (err) {
    next(err);
  }
}

//TODO
async function getProductsMatching(req, res, next) {
  try {
    let { searchTitle } = req.params;

    // Check if searchTitle is provided
    if (!searchTitle) {
      return next(new AppError("Search text is required", 400));
    }

    const products = await Product.find({
      title: { $regex: searchTitle, $options: "i" },
    });

    if (products.length === 0) {
      return next(new AppError("No matching products found", 404));
    }

    res.status(200).json({
      status: "success",
      data: { products: products },
    });
  } catch (err) {
    next(err);
  }
}

const productsController = {
  getAllProducts,
  getAllCategories,
  getProduct,
  getProductsOfCategory,
  getProductsMatching,
};

export default productsController;
