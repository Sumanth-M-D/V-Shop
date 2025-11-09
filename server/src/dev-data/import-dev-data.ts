import dotenv from "dotenv";
import mongoose from "mongoose";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Category, Product } from "../models/index.js";
import type { Category as CategoryType } from "../models/categoryModel.js";
import type { Product as ProductType } from "../models/productModel.js";

dotenv.config();

const databaseUriEnv = process.env.DATABASE;

if (!databaseUriEnv) {
  throw new Error("DATABASE environment variable is not defined");
}

const databaseUri: string = databaseUriEnv;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIRECTORY = path.resolve(__dirname, "../../dev-data");

function readJsonFile<T>(fileName: string): T {
  const filePath = path.join(DATA_DIRECTORY, fileName);
  const fileContent = readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent) as T;
}

const products = readJsonFile<ProductType[]>("products.json");
const categories = readJsonFile<CategoryType[]>("categories.json");

async function importProducts(): Promise<void> {
  await Product.insertMany(products, { ordered: false });
  console.log("Products import successful");
}

async function importCategories(): Promise<void> {
  await Category.insertMany(categories, { ordered: false });
  console.log("Categories import successful");
}

async function importData(): Promise<void> {
  await importCategories();
  await importProducts();
  console.log("All data import successful");
}

async function deleteData(): Promise<void> {
  await Product.deleteMany();
  await Category.deleteMany();
  console.log("Delete successful");
}

type ImportAction = "--import" | "--delete" | undefined;

async function main(): Promise<void> {
  try {
    await mongoose.connect(databaseUri);
    console.log("Database connection successful");

    const action = process.argv[2] as ImportAction;

    if (action === "--delete") {
      await deleteData();
    } else {
      await importData();
    }
  } catch (error) {
    console.error("Data operation failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

void main();
