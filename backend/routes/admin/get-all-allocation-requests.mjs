import { Router } from "express";
import controller from "../../controllers/admin/get-all-allocation-requests.mjs";

const router = Router();
router.get("/get-all-allocation-requests", controller);

export default router;