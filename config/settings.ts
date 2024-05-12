import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  ACCESS_TOKEN_SECRET_KEY:
    process.env.ACCESS_TOKEN_SECRET_KEY || "my_secret_key",
};
