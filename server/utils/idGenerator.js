import mongoose from "mongoose";

class IdGenerator {
   static getId(prefix) {
     return prefix.toUpperCase() + '-' + new mongoose.Types.ObjectId().toString();
   }

   static getUserId() {
      return this.getId('USR');
   }

   static getCartId() {
      return this.getId('CRT');
   }

   static getWishlistId() {
      return this.getId('WSL');
   }

   static getProductId() {
      return this.getId('PRD');
   }
}

export default IdGenerator;
