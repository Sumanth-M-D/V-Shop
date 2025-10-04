import mongoose from "mongoose";
import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import {Product} from "../models/index.js";
import IdGenerator from "../utils/idGenerator.js";

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
try {
  products = JSON.parse(readFileSync("./dev-data/products.json", "UTF-8"));
} catch (err) {
  console.error("Error reading products.json:", err);
  process.exit(1);
}

async function importData() {
  try {
    for (const product of products) {
      const productId = IdGenerator.getProductId();
      await Product.create({...product, productId});
    }
    console.log("Import successful");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function deleteData() {
  try {
    await Product.deleteMany();
    console.log("Delete successful");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

(async function () {
  await connectToDatabase();
  importData();
})();
