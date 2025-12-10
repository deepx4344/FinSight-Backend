import bcrypt from "bcrypt";
// import jwt, { SignOptions } from "jsonwebtoken";

import { AuthTokens, JWTPayLoadInput, ServiceError } from "../types/index.js";
import Users from "../models/users.js";
// import Tokens from "../models/tokens.js";
import { createServiceError } from "../utils/index.js";
import { verificationEmail } from "../utils/sendEmail.js";

class AuthService {
  private readonly JWTSecret: string;
  private readonly JWTRefreshSecret: string;
  private readonly JWTExpiresIn: string;
  private readonly JWTRefreshExpiresIn: string;
  private readonly bcryptSaltRounds: number;
  constructor() {
    this.JWTSecret = process.env["JWT_SECRET"]!;
    this.JWTRefreshSecret = process.env["JWT_REFRESH_SECRET"]!;
    this.JWTExpiresIn = process.env["JWT_EXPIRES_IN"] || "15m";
    this.JWTRefreshExpiresIn = process.env["JWT_REFRESH_EXPIRES_IN"] || "7d";
    this.bcryptSaltRounds = Number(process.env["BCRYPT_ROUNDS"] || "10");
    if (!this.JWTSecret || !this.JWTRefreshSecret) {
      throw new Error("JWT secrets are not defined in enviroment variables");
    }
  }
  register = async (email: string, password: string): Promise<void> => {
    const userExists = await Users.findOne({ email: email });
    if (userExists) {
      throw createServiceError("Email in use", 409);
    }
    const hashedPassword = await bcrypt.hash(password, this.bcryptSaltRounds);
    const newUser = new Users({
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const JWTPayload: JWTPayLoadInput = {
      email: email,
      userId: savedUser._id.toString(),
    };
    await verificationEmail(email, JWTPayload);
    return;
  };
}

export default AuthService;
