import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import IdGenerator from "../utils/idGenerator.js";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "A user must have an email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
  },
  userId: {
    type: String,
    unique: true,
    index: true,
  },
  cartId: String,
  wishlistId: String,
}, { timestamps: true });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUNDS);
//   next();
// });

userSchema.methods.checkPassword = async function (
  inputPassword,
  actualPassword
) {
  return await bcrypt.compare(inputPassword, actualPassword);
};

export const User = mongoose.model("User", userSchema);
