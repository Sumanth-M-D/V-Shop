import { Types } from "mongoose";

type Prefix = "USR" | "CRT" | "WSL" | "PRD" | "CAT";

class IdGenerator {
  private static getId(prefix: Prefix): string {
    return `${prefix}-${new Types.ObjectId().toString()}`;
   }

  static getUserId(): string {
    return this.getId("USR");
   }

  static getCartId(): string {
    return this.getId("CRT");
   }

  static getWishlistId(): string {
    return this.getId("WSL");
   }

  static getProductId(): string {
    return this.getId("PRD");
  }

  static getCategoryId(): string {
    return this.getId("CAT");
  }
}

export default IdGenerator;
