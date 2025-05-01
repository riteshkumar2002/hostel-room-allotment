import { Router } from "express";
import controller from '../../controllers/admin/delete-constraint.mjs'
const router = Router();


router.delete('/delete-constraint/:id',controller );