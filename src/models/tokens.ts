import mongoose from "mongoose";
const time: number = parseInt(process.env["JWT_REFRESH_EXPIRES_IN"]!,10);
const seconds: number = time * 24 * 60 * 60;
const tokensSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tokensSchema.index({ createdAt: 1 }, { expireAfterSeconds: seconds });

const Tokens = mongoose.model("token", tokensSchema);
export default Tokens;
