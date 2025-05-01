import { Router } from "express";
import controller from "../../controllers/admin/deallocate-room.mjs"

const router = Router();
router.delete('/deallocate-room', controller);

export default router;