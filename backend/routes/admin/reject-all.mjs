import { Router } from "express";
import controller from "../../controllers/admin/reject-all.mjs";

const router = Router();
router.delete("/reject-all", controller);

export default router;