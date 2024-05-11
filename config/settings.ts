import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
};
