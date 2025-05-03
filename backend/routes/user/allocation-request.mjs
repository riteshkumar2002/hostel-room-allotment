import { Router } from "express";
import controller from "../../controllers/user/allocation-request.mjs";

const router = Router();
router.post('/allocation-request', controller);

export default router;