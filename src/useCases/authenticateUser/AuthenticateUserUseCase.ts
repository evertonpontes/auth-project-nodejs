import { client } from "@/prisma/prismaClient";
import { compare } from "bcrypt";
import { z } from "zod";
import { IncorrectEmailPassException } from "@/useCases/exceptions/IncorrectEmailPassException";
import { GenerateRefreshToken } from "@/provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "@/provider/GenerateTokenProvider";

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
    // delete some refresh-token if exists
    await client.refreshToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // generate access-token and refresh-token
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(user.id);

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(user.id);

    return { token, refresh_token: refreshToken };
  }
}

export { AuthenticateUserUseCase, userLoginSchema };
