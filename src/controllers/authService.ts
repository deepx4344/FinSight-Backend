import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import { createJwt } from "../utils/jwt.js";
import { AuthTokens, JWTPayLoadInput, JWTPayLoadOutput } from "../types/index.js";
import Users from "../models/users.js";
import Tokens from "../models/tokens.js";
import { createServiceError } from "../utils/index.js";
import { verificationEmail } from "../utils/sendEmail.js";
import { EmailOptions } from "joi";

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
  login = async (email: string, password: string): Promise<AuthTokens> => {
    const userExists = await Users.findOne({ email: email });
    if (!userExists) {
      throw createServiceError(`Invalid Credentials`, 404);
    }
    if (!userExists.verified) {
      throw createServiceError("Please verify email before login", 403);
    }
    const valid: boolean = await bcrypt.compare(password, userExists.password);
    if (!valid) {
      throw createServiceError("Invalid Credentials", 401);
    }
    const payload = {
      userId: userExists._id.toString(),
      email: userExists.email,
    };
    return createJwt(payload);
  };
  verify = async(token:string):Promise<void>=>{
    let tokenValid:JWTPayLoadOutput = jwt.verify(token,process.env["VERIFICATION_KEY"]!) as JWTPayLoadOutput
    if(!tokenValid){
      throw createServiceError("Invalid or Expired Tokens",400)
    }
    await Users.findByIdAndUpdate(tokenValid.userId,{verified:true})
  } 
}

export default AuthService;
