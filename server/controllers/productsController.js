import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";
import sanitizeText from "../utils/sanitizeText.js";

// Fetch all products from the database
async function getAllProducts(req, res, next) {
  try {
    const products = await Product.find().lean();

    res.status(200).json({
      status: "success",
      data: { products: products },
    });
  } catch (err) {
    next(err);
  }
}

// Fetch all unique categories from the products collection
async function getAllCategories(req, res, next) {
  try {
    // Use distinct to get unique categories
    const categories = await Product.distinct("category");
    res.status(200).json({
      status: "success",
      data: { categories: categories },
    });
  } catch (err) {
    next(err);
  }
}

// Fetch a single product by its ID
async function getProduct(req, res, next) {
  try {
    // Get the product ID from the request parameters & Query the product by ID
    const id = req.params.id;
    const product = await Product.findById(id).lean();

    if (!product) next(new AppError("No product found", 404));

    res.status(200).json({
      status: "success",
      data: { product: product },
    });
  } catch (err) {
    next(err);
  }
}

// Fetch products that belong to a specific category
async function getProductsOfCategory(req, res, next) {
  try {
    const { category } = req.params;

    const productsOfCategory = await Product.find({ category }).lean();

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

// Fetch products matching a search term in their title
async function getProductsMatching(req, res, next) {
  try {
    let { searchTitle } = req.params;

    // Check if searchTitle is provided
    if (!searchTitle) {
      return next(new AppError("Search text is required", 400));
    }

    // Query for products whose titles match the search term (case insensitive)
    const products = await Product.find({
      title: { $regex: searchTitle, $options: "i" },
    }).lean();

    // If no matching products are found, trigger an error
    if (products.length === 0) {
      return next(new AppError("No matching products found", 404));
    }

    // Respond with a success status and the matching products
    res.status(200).json({
      status: "success",
      data: { products: products },
    });
  } catch (err) {
    next(err);
  }
}

// Export the controller functions as an object for use in routes
const productsController = {
  getAllProducts,
  getAllCategories,
  getProduct,
  getProductsOfCategory,
  getProductsMatching,
};

export default productsController;
