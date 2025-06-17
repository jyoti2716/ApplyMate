import express from "express";
import isAuthenticated from "../MiddleWare/isAuthenticated.js";
import { postJob,getAdminJobs, getAllJobs, getJobById } from "../Controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);

export default router;