import { Router } from "express";
import controller from "../../controllers/admin/applicable-applicants.mjs";

const router = Router();
router.post("/applicable-applicants", controller);

export default router;