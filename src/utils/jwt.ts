import jwt, { SignOptions } from "jsonwebtoken";
import { AuthTokens, JWTPayLoadInput } from "../types/index.js";
import Tokens from "../models/tokens.js";
export const createJwt = async (payload: JWTPayLoadInput): Promise<AuthTokens> => {
  const accessTokenOptions: SignOptions = {
    expiresIn: process.env["JWT_EXPIRES_IN"] as any,
  };
  const refreshTokenOptions: SignOptions = {
    expiresIn: process.env["JWT_REFRESH_EXPIRES_IN"] as any,
  };
  const accessToken = jwt.sign(
    payload,
    process.env["JWT_SECRET"]!,
    accessTokenOptions
  );
  const refreshToken = jwt.sign(
    payload,
    process.env["JWT_REFRESH_SECRET"]!,
    refreshTokenOptions
  );
  const newToken = new Tokens({
    user:payload.userId,
    token:refreshToken
  })
  await newToken.save()
  return {
    accessToken,
    refreshToken,
  };
};
