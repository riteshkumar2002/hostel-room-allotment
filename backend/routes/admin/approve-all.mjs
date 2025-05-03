import { Router } from "express";
import controller from '../../controllers/admin/approve-all.mjs'

const router = Router();
router.post("/approve-all", controller);

export default router;