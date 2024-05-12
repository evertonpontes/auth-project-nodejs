import { client } from "@/prisma/prismaClient";
import dayjs from "dayjs";

class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(1, "minute").unix();

    const refreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return refreshToken;
  }
}

export { GenerateRefreshToken };
