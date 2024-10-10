import { config } from "dotenv";

switch (process.env.NODE_ENV) {
  case "development":
    config({ path: ".env.local" });
    break;
  case "production":
    config({ path: ".env.production" });
    break;
  default:
    config({ path: ".env" });
    break;
}
