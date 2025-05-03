import { Router } from "express";
import controller from "../../controllers/user/signup.mjs";

const router = Router();
router.post('/signup', controller);

export default router;