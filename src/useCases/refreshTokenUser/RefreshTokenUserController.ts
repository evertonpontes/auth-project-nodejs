import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";
import { InvalidRefreshTokenException } from "../exceptions/InvalidRefreshTokenException";
import { RefreshTokenExpiredException } from "../exceptions/RefreshTokenExpiredException";

class RefreshTokenUserController {
  async handler(req: Request, res: Response) {
    const { refresh_token } = req.body;

    const refreshTokenUserUseCase = new RefreshTokenUserUseCase();

    try {
      const auth = await refreshTokenUserUseCase.execute(refresh_token);

      return res.send(auth);
    } catch (error) {
      if (
        error instanceof InvalidRefreshTokenException ||
        error instanceof RefreshTokenExpiredException
      ) {
        return res.status(401).send({
          status: "Error",
          message: error.message,
        });
      }
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export { RefreshTokenUserController };
