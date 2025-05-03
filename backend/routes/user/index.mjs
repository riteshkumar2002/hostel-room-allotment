import { Router } from "express";

import signUp from "./signup.mjs";
import login from "./login.mjs";


import allocationRequest from "./allocation-request.mjs";

const router = Router();
router.use("/user", signUp, login, allocationRequest);

export default router;
