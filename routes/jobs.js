import exprees from "express";
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../controllers/jobs.js";


const router = exprees.Router();

router.get("/", getAllJobs);
router.post("/", createJob);
router.get("/:id", getJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router


