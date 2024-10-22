import Product from "../models/productModel.js";
import AppError from "../utils/appError.js";

async function getAllProducts(req, res, next) {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      data: products,
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
      data: categories,
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
      data: product,
    });
  } catch (err) {
    next(err);
  }
}

const productsController = {
  getAllProducts,
  getAllCategories,
  getProduct,
};

export default productsController;
