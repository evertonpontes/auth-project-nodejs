import { Request, Response } from "express";
import { z } from "zod";
import {
  RegisterUserUseCase,
  userSchema,
} from "@useCases/registerUser/RegisterUserUseCase";
import { EmailAlreadyExistsException } from "../exceptions/EmailAlreadyExistsException";

interface IRegisterUserRequest extends Request {
  body: z.infer<typeof userSchema>;
}

class RegisterUserController {
  async handler(req: IRegisterUserRequest, res: Response) {
    const registerUserUseCase = new RegisterUserUseCase();

    try {
      const { email, name, password } = userSchema.parse(req.body);

      const user = await registerUserUseCase.execute({ email, name, password });

      res.status(201).send({
        user,
      });
    } catch (error) {
      if (error instanceof EmailAlreadyExistsException) {
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

export { RegisterUserController };
