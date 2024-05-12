import { client } from "@/prisma/prismaClient";
import { InvalidRefreshTokenException } from "../exceptions/InvalidRefreshTokenException";
import { GenerateTokenProvider } from "@/provider/GenerateTokenProvider";
import dayjs from "dayjs";
import { RefreshTokenExpiredException } from "../exceptions/RefreshTokenExpiredException";
import { GenerateRefreshToken } from "@/provider/GenerateRefreshToken";

class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    // verify if refresh token exists
    const refreshToken = await client.refreshToken.findUnique({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      throw new InvalidRefreshTokenException("Refresh token invalid!");
    }
    // verify if refresh token is expired
    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn),
    );

    if (refreshTokenExpired) {
      throw new RefreshTokenExpiredException("Refresh token expired!");
    }
    // delete all refresh token in db to store a new
    await client.refreshToken.deleteMany({
      where: {
        userId: refreshToken.userId,
      },
    });
    // generate a new refresh token and access token for each action of user
    // if user is inactive for a time, the refresh token will expires
    const generateRefreshToken = new GenerateRefreshToken();

    const newRefreshToken = await generateRefreshToken.execute(
      refreshToken.userId,
    );

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    return { token, refresh_token: newRefreshToken };
  }
}

export { RefreshTokenUserUseCase };
