import express from "express";
import {login,logout,register,updateProfile} from "../Controllers/user.controller.js";
import isAuthenticated from "../MiddleWare/isAuthenticated.js";
import { singleUpload } from "../MiddleWare/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;