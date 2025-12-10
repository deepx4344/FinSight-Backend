import AuthService from "./authService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createAPIResponse } from "../utils/index.js";

const auth = new AuthService();

export const register = asyncHandler(async (req, res) => {
    const dataToSend = {
      success: true,
      message: "Registration Successful, Proceed to login",
    };
  if (!req.body) {
    dataToSend.success = false;
    dataToSend.message = "Body is not given"
    return res.status(400).json(createAPIResponse(dataToSend))
  }
  const { email, password } = req.body;
  await auth.register(email, password);
  return res.status(201).json(createAPIResponse(dataToSend));
});
