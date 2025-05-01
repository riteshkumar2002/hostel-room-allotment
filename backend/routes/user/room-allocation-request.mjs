import { Router } from "express";
import controller from "../../controllers/user/room-allocation-request.mjs";

const router = Router();
router.post('/room-allocation-request', controller);

export default router;