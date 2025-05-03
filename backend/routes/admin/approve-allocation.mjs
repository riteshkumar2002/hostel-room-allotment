import { Router } from "express";
import controller from '../../controllers/admin/approve-allocation.mjs'

const router = Router();

router.post("/approve", controller);

export default router;