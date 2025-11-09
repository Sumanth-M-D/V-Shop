import type { NextFunction, Request, Response } from "express";
import { Category } from "../models/index.js";
import AppError from "../utils/appError.js";

async function getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const categories = await Category.find().lean();

    if (!categories.length) {
      next(new AppError("No categories found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      data: { categories },
    });
  } catch (err) {
    next(err);
  }
}

async function getCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as { id: string };

    const category = await Category.findOne({
      $or: [{ categoryId: id }, { formattedName: id }],
    }).lean();

    if (!category) {
      next(new AppError("No category found", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      data: { category },
    });
  } catch (err) {
    next(err);
  }
}

async function getCategoryByFormattedName(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { formattedName } = req.params as { formattedName: string };
    const category = await Category.findOne({ formattedName }).lean();

    if (!category) {
      next(new AppError("No category found", 404));
      return;
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
