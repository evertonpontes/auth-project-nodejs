import { client } from "@/prisma/prismaClient";
import { Request, Response } from "express";

class LogoutUserController {
  async handler(req: Request, res: Response) {
    const { userId } = req.auth;

    try {
      // delete refresh token from db
      await client.refreshToken.deleteMany({
        where: {
          userId,
        },
      });
      res.status(200).send("Logout Successful");
    } catch (error) {
      console.log(error);
      res.status(400).send("Internal Server Error");
    }
  }
}

export { LogoutUserController };
