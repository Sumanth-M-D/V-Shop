import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// Defining the schema for the User model
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

  cartId: {
    type: mongoose.Schema.ObjectId,
    ref: "Cart",
  },

  wishlistId: {
    type: mongoose.Schema.ObjectId,
    ref: "Wishlist",
  },
});

// Pre-save middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  // Check if the password is modified (either newly created or updated)
  if (!this.isModified("password")) return next();

  // Hash the password with the specified number of salt rounds
  this.password = await bcrypt.hash(this.password, +process.env.SALT_ROUNDS);
  next();
});

// Method to check if the provided password matches the actual password
userSchema.methods.checkPassword = async function (
  inputPassword,
  actualPassword
) {
  return await bcrypt.compare(inputPassword, actualPassword);
};

// Export the User model
const User = mongoose.model("User", userSchema);
export default User;
