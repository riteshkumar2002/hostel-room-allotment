import { Router } from "express";
import controller from "../../controllers/user/check-availabe-rooms.mjs";

const router = Router();

router.get("/check-available-rooms", controller);

export default router;