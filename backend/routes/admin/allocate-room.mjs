import { Router } from "express";
import controller from "../../controllers/admin/allocate-room.mjs";

const router = Router();
router.post('/allocate-room', controller);

export default router;