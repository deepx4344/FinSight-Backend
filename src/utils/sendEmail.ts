import nodemailer from "nodemailer";
import emailFormat from "./emailVerification.js";
import logger from "../middlewares/logger.js";
import { JWTPayLoadInput } from "../types/index.js";
export const verificationEmail = async (to:string, payload:JWTPayLoadInput) => {
  try {
    let format = await emailFormat(payload);
    const transporter = nodemailer.createTransport({
      host: "127.0.0.1",
      port: 1025,
      secure: false,
      ignoreTLS: true,
    });
    await transporter.sendMail({
      from: `verify@${process.env["NAME"]}.com`,
      to: to,
      subject: "Verify Your Email",
      html: format,
    });
  } catch (e) {
    logger.error("Error from send Emails", { error: e });
  }
};
