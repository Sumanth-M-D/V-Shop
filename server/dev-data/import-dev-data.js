import mongoose from "mongoose";
import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import { Product, Category } from "../models/index.js";

dotenv.config();

const db = process.env.DATABASE;

async function connectToDatabase() {
  try {
    await mongoose.connect(db);
    console.log("Database connection successful");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}

let products;
let categories;
try {
  products = JSON.parse(readFileSync("./dev-data/products.json", "UTF-8"));
  categories = JSON.parse(readFileSync("./dev-data/categories.json", "UTF-8"));
} catch (err) {
  console.error("Error reading JSON files:", err);
  process.exit(1);
}

async function importProducts() {
  try {
    // Products already have productId in the JSON, so we use them directly
    for (const product of products) {
      await Product.create(product);
    }
    console.log("Products import successful");
  } catch (err) {
    console.error("Error importing products:", err);
    throw err;
  }
}

async function importCategories() {
  try {
    // Categories already have categoryId in the JSON, so we use them directly
    for (const category of categories) {
      await Category.create(category);
    }
    console.log("Categories import successful");
  } catch (err) {
    console.error("Error importing categories:", err);
    throw err;
  }
}

async function importData() {
  try {
    await importCategories();
    await importProducts();
    console.log("All data import successful");
  } catch (err) {
    console.error("Import failed:", err);
    process.exit(1);
  }
}

async function deleteData() {
  try {
    await Product.deleteMany();
    await Category.deleteMany();
    console.log("Delete successful");
  } catch (err) {
    console.error("Delete failed:", err);
    process.exit(1);
  }
}

(async function () {
  await connectToDatabase();
  const action = process.argv[2];
  
  if (action === "--delete") {
    await deleteData();
  } else if (action === "--import") {
    await importData();
  } else {
    // Default action is import
    await importData();
  }
  
  process.exit(0);
})();
