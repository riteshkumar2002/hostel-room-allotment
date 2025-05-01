import { Router } from "express";
import controller from "../../controllers/user/sign-up.mjs";

const router = Router();
router.post('/sign-up', controller);

export default router;