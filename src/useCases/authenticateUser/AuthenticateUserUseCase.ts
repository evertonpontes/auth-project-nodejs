import { client } from "@/prisma/prismaClient";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { IncorrectEmailPassException } from "@/useCases/exceptions/IncorrectEmailPassException";
import { config } from "config/settings";

const userLoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email format.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password provided must have at least 8 characters long.",
    })
    .max(40, {
      message: "Password provided must have at most 40 characters long.",
    }),
});

class AuthenticateUserUseCase {
  async execute({ email, password }: z.infer<typeof userLoginSchema>) {
    // verify if user exists
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new IncorrectEmailPassException("Email or password incorrect!");
    }
    // compare password from request body with password in db
    const passwordMatch = await compare(password, user.hashedPassword);

    if (!passwordMatch) {
      throw new IncorrectEmailPassException("Email or password incorrect!");
    }
    // generate access-token and refresh-token
    const secretKey = config.ACCESS_TOKEN_SECRET_KEY;
    const accessToken = jwt.sign({}, secretKey, {
      subject: user.id,
      expiresIn: "1m",
    });

    return accessToken;
  }
}

export { AuthenticateUserUseCase, userLoginSchema };
