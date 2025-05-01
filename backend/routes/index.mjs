import { Router } from "express";

import admin from "./admin/index.mjs";
import user from "./user/index.mjs";

const router = Router();
router.use("/api", admin, user);

export router;