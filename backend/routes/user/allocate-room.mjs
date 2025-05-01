import { Router } from "express";
import controller from "../../controllers/user/allocate-room.mjs";

const router = Router();
router.post('/allocate-room', controller);