import express from "express";
const router = express.Router();
import { create_user, log_in } from "../controllers/userController";

router.post("/signup", create_user);
router.post("/login", log_in);

export default router;
