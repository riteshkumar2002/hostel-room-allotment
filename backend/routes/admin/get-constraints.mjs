import { Router } from "express";
import controller from '../../controllers/admin/get-constraints.mjs'
const router = Router();

router.get('/get-constraints', controller);

export default router;