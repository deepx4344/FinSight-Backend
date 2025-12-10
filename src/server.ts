import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";

const PORT: number = Number(process.env["PORT"] ?? 3000);

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server Started at port ${PORT}`);
  });
});
