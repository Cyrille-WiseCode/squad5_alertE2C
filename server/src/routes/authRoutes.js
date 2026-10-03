import { Router } from "express";
import { register, login, loginAgent } from "../controllers/authController.js";

const router = Router();

router.post("/register", register); // US-01
router.post("/login", login); // US-02 / US-03
router.post("/agent/login", loginAgent); // US-03

export default router;
