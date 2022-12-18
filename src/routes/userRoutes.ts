import express from "express";
const router = express.Router();
import { create_user } from "../controllers/userController";

router.post("/signup", create_user);

export default router;
