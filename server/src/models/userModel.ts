import bcrypt from "bcrypt";
import {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
  type Model,
  type Types,
} from "mongoose";
import validator from "validator";

const SALT_ROUNDS = 12;

const userSchema = new Schema(
  {
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
      required: true,
    },
    cartId: {
      type: String,
    },
    wishlistId: {
      type: String,
    },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;

export type UserDocument = HydratedDocument<User> & {
  checkPassword: (inputPassword: string) => Promise<boolean>;
};

export type UserModel = Model<UserDocument>;
export type AuthenticatedUser = Pick<User, "userId" | "email" | "cartId" | "wishlistId">;

export type UserSafe = Omit<User, "password">;

userSchema.methods.checkPassword = async function (
  this: UserDocument,
  inputPassword: string
): Promise<boolean> {
  if (!this.password) {
    throw new Error("Password hash is not available on this document");
  }

  return bcrypt.compare(inputPassword, this.password);
};

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
  } catch (err) {
    next(err as Error);
  }
});

export const User = model<UserDocument>("User", userSchema);
