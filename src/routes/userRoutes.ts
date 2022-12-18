import express from "express";
const router = express.Router();
import { create_user } from "../controllers/userController";

router.post("/sign-up", create_user);
