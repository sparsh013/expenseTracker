import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.route("/register").post(register)
userRoute.route("/login").post(login)
userRoute.route("/logout").post(logout)

export default userRoute;