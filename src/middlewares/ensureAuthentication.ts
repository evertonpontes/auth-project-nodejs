import { config } from "config/settings";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IAuthRequest extends Request {
  auth: string;
}

function ensureAuthentication(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers["authorization"];

  if (!authToken) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    jwt.verify(token, config.ACCESS_TOKEN_SECRET_KEY);

    next();
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
}

export { ensureAuthentication, IAuthRequest };
