export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponseinput {
  success: boolean;
  message: string;
  token?: AuthTokens;
  datas?: Record<string, string[]>;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface ApiResponseOutPut {
  success: boolean;
  message: string;
  token?: AuthTokens;
  datas?: Record<string, string[]>;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayLoadOutput {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}
export interface JWTPayLoadInput{
  userId:string;
  email:string;
}

export class ServiceError extends Error {
  statusCode: number;
  code?: string;
  details?: any;
  constructor(
    message: string,
    statusCode: number = 500,
    code?: string,
    details?: any
  ) {
    super(message);
    this.name = "ServiceError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}
export interface ServiceErrorInput {
  message: string;
  statusCode: number;
  code?: string;
  details?: any;
}
