import AuthService from "./authService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createAPIResponse } from "../utils/index.js";
import { ApiResponseinput, AuthTokens } from "../types/index.js";

const auth = new AuthService();

export const register = asyncHandler(async (req, res) => {
  const dataToSend: ApiResponseinput = {
    success: true,
    message: "Registration Successful, Proceed to login",
  };
  if (!req.body) {
    dataToSend.success = false;
    dataToSend.message = "Body is not given";
    return res.status(400).json(createAPIResponse(dataToSend));
  }
  const { email, password } = req.body;
  await auth.register(email, password);
  return res.status(201).json(createAPIResponse(dataToSend));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let response: AuthTokens = await auth.login(email, password);
  const dataToSend: ApiResponseinput = {
    success: true,
    message: "Login Successful",
    token: response,
  };
  return res.status(200).json(createAPIResponse(dataToSend));
});

export const verify = asyncHandler(async (req, res) => {
  const token: string = req.params["token"]!;
  await auth.verify(token);
  const dataToSend: ApiResponseinput = {
    message: "Email Verification Successful",
    success: true,
  };
  return res.status(200).json(createAPIResponse(dataToSend));
});
