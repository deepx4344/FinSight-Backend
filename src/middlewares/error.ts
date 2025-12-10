import { ServiceError } from "../types/index.js";
import { Request, Response, NextFunction } from "express";
import { createAPIResponse } from "../utils/index.js";
import logger from "./logger.js";

const errormiddleWare = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = 500;
  let message: string = "An Error Occured";

  if (err instanceof ServiceError) {
    statusCode = err.statusCode;
    switch (statusCode) {
      case 400:
        message = err.message || "Bad Request";
        break;
      case 409:
        message = err.message || "Conflict";
        break;
      case 401:
        message = err.message || "Unauthorized";
        break;
      default:
        message = err.message || message;
        break;
    }
  }

  const dataToSend = {
    success: false,
    message: message,
  };
  logger.error(err);
  return res.status(statusCode).json(createAPIResponse(dataToSend));
};

export default errormiddleWare;
