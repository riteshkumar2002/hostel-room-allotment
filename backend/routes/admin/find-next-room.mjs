import { Router } from "express";
import controller from '../../controllers/admin/find-next-room.mjs'
const router = Router();



router.get('/find-next-room', controller );

export default router;
