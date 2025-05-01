import { Router } from "express";
import controller from "../../controllers/admin/add-constraint.mjs"

const router = Router();
router.post('/add-constraint', controller);

export default router;
