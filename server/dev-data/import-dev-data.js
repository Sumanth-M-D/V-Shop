import mongoose from "mongoose";
import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import Product from "../models/productModel.js";

dotenv.config();

// Getting required environment variables
const db = process.env.DATABASE;

// Connecting to Mongodb Atlas database
async function connectToDatabase() {
  try {
    await mongoose.connect(db);
    console.log("Database connection successful");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
}

// Getting products data from json file
let products;
try {
  products = JSON.parse(readFileSync("./dev-data/products.json", "UTF-8"));
} catch (err) {
  console.error("Error reading products.json:", err);
  process.exit(1);
}

// function to importdata to database
async function importData() {
  try {
    for (const product of products) {
      await Product.create(product); // Alternatively, use `new Product(product).save()`
    }
    console.log("Import successful");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

//function to delete data from datatbase
async function deleteData() {
  try {
    await Product.deleteMany();
    console.log("Delete successful");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// First connect to the database, then import data
(async function () {
  await connectToDatabase();
  importData();
  // or uncomment the following line to delete data instead of importing
  // deleteData();
})();
