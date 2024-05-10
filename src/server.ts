import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { config } from "../config/settings";

const app = express();

app.use(cors);
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
