import { Category } from "../models/index.js";
import AppError from "../utils/appError.js";

async function getCategories(req, res, next) {
  try {
    const categories = await Category.find().lean();

    if (categories.length === 0) {
      return next(new AppError("No categories found", 404));
    }

    res.status(200).json({
      status: "success",
      data: { categories },
    });
  } catch (err) {
    next(err);
  }
}

async function getCategory(req, res, next) {
  try {
    const { id } = req.params;
    
    // Try to find by categoryId first, then by formattedName, then by _id
    const category = await Category.findOne({
      $or: [
        { categoryId: id },
        { formattedName: id },
        { _id: id },
      ],
    }).lean();

    if (!category) {
      return next(new AppError("No category found", 404));
    }

    res.status(200).json({
      status: "success",
      data: { category },
    });
  } catch (err) {
    next(err);
  }
}

async function getCategoryByFormattedName(req, res, next) {
  try {
    const { formattedName } = req.params;
    const category = await Category.findOne({ formattedName }).lean();

    if (!category) {
      return next(new AppError("No category found", 404));
    }

    res.status(200).json({
      status: "success",
      data: { category },
    });
  } catch (err) {
    next(err);
  }
}

const categoriesController = {
  getCategories,
  getCategory,
  getCategoryByFormattedName,
};

export default categoriesController;

