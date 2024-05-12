import {
  userLoginSchema,
  AuthenticateUserUseCase,
} from "@/useCases/authenticateUser/AuthenticateUserUseCase";
import { Request, Response } from "express";
import { z } from "zod";
import { IncorrectEmailPassException } from "@/useCases/exceptions/IncorrectEmailPassException";

interface ILoginRequest extends Request {
  body: z.infer<typeof userLoginSchema>;
}

class AuthenticateUserController {
  async handler(req: ILoginRequest, res: Response) {
    const authenticateUserUseCase = new AuthenticateUserUseCase();

    try {
      const { email, password } = userLoginSchema.parse(req.body);

      const token = await authenticateUserUseCase.execute({ email, password });

      res.status(200).send({ token });
    } catch (error) {
      if (error instanceof IncorrectEmailPassException) {
        return res.status(400).send({
          status: "Error",
          message: error.message,
        });
      } else if (error instanceof z.ZodError) {
        return res.status(400).send({
          status: "ErrorValidate",
          issues: error.issues.map((issue) => ({
            code: issue.code,
            message: issue.message,
          })),
        });
      }
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export { AuthenticateUserController };
