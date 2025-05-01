import { Router } from "express";

import signUp from "./sign-up.mjs";
import login from "./login.mjs";

import allocateRoom from "./allocate-room.mjs";
import deallocateRoom from "./deallocate-room.mjs";

import roomAllocationRequest from "./room-allocation-request.mjs";

const router = Router();
router.use("/user", signUp, login, allocateRoom, deallocateRoom, roomAllocationRequest);

export default router;
