import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
    minlength: 8,
    maxlength: 15,
    required: [true, "Please provide a password"],
    select: false,
  },

  cart: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  wishlist: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUNDS);
  next();
});

userSchema.methods.checkPassword = async function (
  inputPassword,
  actualPassword
) {
  return await bcrypt.compare(inputPassword, actualPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
