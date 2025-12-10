import logger from "../middlewares/logger.js";
import jwt, { SignOptions } from "jsonwebtoken";
import { JWTPayLoadInput } from "../types/index.js";
const emailFormat = async (payload: JWTPayLoadInput) => {
  try {
    const jwtOptions: SignOptions = {
      expiresIn: process.env["VERIFICATION_EXPIRES"] as any,
    };
    const token = jwt.sign(
      payload,
      process.env["VERIFICATION_KEY"]!,
      jwtOptions
    );
    const htmlFormat = `<b>
          Welcome to ${process.env["NAME"]!}
          below is your verification token, click <a href="http://${process.env["DEVHOST"]!}/api/auth/verify/${token}">here</a> to verify email
          If this action was not performed by you, ignore.
          </b>`;
    return htmlFormat;
  } catch (e) {
    logger.error("Error from genToken and Format", { error: e });
    return;
  }
};
export default emailFormat;
