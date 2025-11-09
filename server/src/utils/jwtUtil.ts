import dotenv from "dotenv";
import jwt, { type JwtPayload, type Secret, type SignOptions } from "jsonwebtoken";

dotenv.config();

const {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_EXPIRES_IN = "15m",
  JWT_REFRESH_EXPIRES_IN = "7d",
} = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const ACCESS_SECRET: Secret = JWT_SECRET;
const REFRESH_SECRET: Secret = JWT_REFRESH_SECRET ?? JWT_SECRET;

export interface TokenPayload extends JwtPayload {
  userId: string;
}

class JwtUtil {
  static signAccessToken(payload: TokenPayload, options: SignOptions = {}): string {
    const signOptions: SignOptions = { ...options };
    if (!signOptions.expiresIn) {
      signOptions.expiresIn = JWT_EXPIRES_IN as SignOptions["expiresIn"];
    }
    return jwt.sign(payload, ACCESS_SECRET, signOptions);
  }

  static signRefreshToken(payload: TokenPayload, options: SignOptions = {}): string {
    const signOptions: SignOptions = { ...options };
    if (!signOptions.expiresIn) {
      signOptions.expiresIn = JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"];
    }
    return jwt.sign(payload, REFRESH_SECRET, signOptions);
  }

  static verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
  }

  static verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
  }
}

export default JwtUtil;
