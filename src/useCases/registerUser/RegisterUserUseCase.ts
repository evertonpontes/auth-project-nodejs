import { client } from "@/prisma/prismaClient";
import { hash } from "bcrypt";
import z from "zod";
import { EmailAlreadyExistsException } from "@useCases/exceptions/EmailAlreadyExistsException";

const userSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name provided must have at least 3 characters long.",
    })
    .max(32, {
      message: "Name provided must have at most 32 characters long.",
    }),
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

class RegisterUserUseCase {
  async execute({ email, name, password }: z.infer<typeof userSchema>) {
    // verify if email address exists
    const userAlreadyExists = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new EmailAlreadyExistsException("Email already exists!");
    }

    // hash password to store
    const hashedPassword = await hash(password, 10);
    //  register user into the database
    const user = await client.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return user;
  }
}

export { RegisterUserUseCase, userSchema };
