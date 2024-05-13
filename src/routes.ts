import { Router } from "express";
import { RegisterUserController } from "@/useCases/registerUser/RegisterUserController";
import { AuthenticateUserController } from "@/useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthentication } from "@/middlewares/ensureAuthentication";
import { RefreshTokenUserController } from "@/useCases/refreshTokenUser/RefreshTokenUserController";
import { LogoutUserController } from "@/useCases/logoutUser/LogoutUserController";

const router = Router();

const registerUserController = new RegisterUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();
const logoutUserController = new LogoutUserController();

router.post("/register", registerUserController.handler);
router.post("/login", authenticateUserController.handler);
router.post("/refresh-token", refreshTokenUserController.handler);

router.get("/user", ensureAuthentication, (req, res) => {
  const auth = req.auth;
  res
    .status(200)
    .send(
      "You are authenticated, so you can see this message! User ID: " +
        auth.userId,
    );
});

router.get("/logout", ensureAuthentication, logoutUserController.handler);

export { router };
