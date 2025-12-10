import { CorsOptions } from "cors";

const clients: string | string[] = process.env["CLIENT"]!;

const corsOption: CorsOptions = {
  origin: clients,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

export default corsOption
