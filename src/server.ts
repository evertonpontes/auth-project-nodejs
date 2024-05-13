import express, { Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "config/settings";
import { router } from "@/routes";

const app = express();

interface AuthProp {
  auth: {
    userId: string;
  };
}

declare global {
  namespace Express {
    interface Request extends AuthProp {}
  }
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  console.log("teste");
  res.send("Hello World");
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
