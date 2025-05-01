import { Router } from "express";
import controller from "../../controllers/admin/applicable-applicants.mjs";

const router = Router();
router.use("/applicable-applicants", controller);

export router;