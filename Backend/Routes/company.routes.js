import express from "express";
import {getCompany, getCompanyById,registerCompany,updateCompany} from "../Controllers/company.controller.js";
import isAuthenticated from "../MiddleWare/isAuthenticated.js";
import { singleUpload } from "../MiddleWare/multer.js"; 

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany);

export default router;