import { config } from "config/settings";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function ensureAuthentication(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers["authorization"];

  if (!authToken) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const auth = jwt.verify(token, config.ACCESS_TOKEN_SECRET_KEY);

    req.auth = {
      userId: auth.sub as string,
    };

    next();
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
}

export { ensureAuthentication };
