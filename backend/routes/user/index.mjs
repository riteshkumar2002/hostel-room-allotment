import { Router } from "express";

import signUp from "./signup.mjs";
import login from "./login.mjs";


import roomAllocationRequest from "./room-allocation-request.mjs";

const router = Router();
router.use("/user", signUp, login, roomAllocationRequest);

export default router;
