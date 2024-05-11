import { Router } from "express";
import { RegisterUserController } from "@/useCases/registerUser/RegisterUserController";

const router = Router();

const registerUserController = new RegisterUserController();

router.post("/register", registerUserController.handler);

export { router };
