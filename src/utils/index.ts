import {
  ApiResponseinput,
  ApiResponseOutPut,
  ServiceError,
} from "../types/index.js";

export function createAPIResponse(input: ApiResponseinput): ApiResponseOutPut {
  return input;
}

export function createServiceError(
  message: string,
  statusCode: number,
  code?: string,
  details?: any
): ServiceError {
  return new ServiceError(message, statusCode, code, details);
}
