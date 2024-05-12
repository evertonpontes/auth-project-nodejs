import { Router } from "express";
import { RegisterUserController } from "@/useCases/registerUser/RegisterUserController";
import { AuthenticateUserController } from "@/useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthentication } from "@/middlewares/ensureAuthentication";

const router = Router();

const registerUserController = new RegisterUserController();
const authenticateUserController = new AuthenticateUserController();

router.post("/register", registerUserController.handler);
router.post("/login", authenticateUserController.handler);
router.get("/user", ensureAuthentication, (req, res) => {
  res.status(200).send({
    msg1: "teste1",
    msg2: "teste2",
    msg3: "teste3",
    msg4: "teste4",
  });
});

export { router };
