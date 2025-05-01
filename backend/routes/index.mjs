import express from "express";

import admin from "./admin/index.mjs";
import user from "./user/index.mjs";

const router = express.Router();

router.use(express.json());
router.use("/api", admin, user);


export default router;