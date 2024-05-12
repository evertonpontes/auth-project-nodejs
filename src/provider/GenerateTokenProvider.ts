import { config } from "config/settings";
import jwt from "jsonwebtoken";

class GenerateTokenProvider {
  async execute(userId: string) {
    const secretKey = config.ACCESS_TOKEN_SECRET_KEY;
    const token = jwt.sign({}, secretKey, {
      subject: userId,
      expiresIn: "30s",
    });
    return token;
  }
}

export { GenerateTokenProvider };
