// import {defineConfig} from "drizzle-kit";
// import { ENV } from "./src/config/env";


import { ENV } from "./src/config/env";

export default {
  dialect: "postgresql",
  schema: ["/home/kariiim/Desktop/productifity/backend/src/db/schema.ts"],
  dbCredentials: {
    url: ENV.DATABASE_URL!,
  },
};