import jwt, { TokenExpiredError } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

interface IPayload {
  idUser: string;
  email: string;
  role: string;
}

export const genToken = (payload: IPayload): string => {
  if (!secret) {
    throw new AppError(
      ERROR_MESSAGE.SERVER_ERROR,
      STATUS_CODE.SERVER_ERROR,
    );
  }
  return jwt.sign(payload, secret, {
    expiresIn: "7d", // Token expira em 7 dias
  });
};

export const verifyToken = (token: string): IPayload => {
  if (!secret) {
    throw new AppError(
      ERROR_MESSAGE.SERVER_ERROR,
      STATUS_CODE.SERVER_ERROR,
    );
  }

  try {
    const decoded = jwt.verify(token, secret) as IPayload;
    return decoded;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_TOKEN,
        STATUS_CODE.UNAUTHORIZED,
      );
    }
    throw new AppError(
      ERROR_MESSAGE.INVALID_TOKEN,
      STATUS_CODE.UNAUTHORIZED,
    );
  }
};
