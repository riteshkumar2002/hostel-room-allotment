import { Router } from "express";
import controller from "../../controllers/user/login.mjs";

const router = Router();
router.post("/login", controller);

export default router;