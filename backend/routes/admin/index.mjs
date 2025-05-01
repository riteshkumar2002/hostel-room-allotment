import { Router } from "express";

import addConstraint from './add-constraint.mjs';
import deleteConstraint from './delete-constraint.mjs'
import getConstraints from './get-constraints.mjs'

import approveAll from './approve-all.mjs'
import approveAllocation from './approve-allocation.mjs'

import findNextRoom from './find-next-room.mjs'


import allcateRoom from './allocate-room.mjs'
import deallocateRoom from './deallocate-room.mjs'




const router = Router();

router.use('/admin',addConstraint,approveAll,approveAllocation,deleteConstraint,findNextRoom,getConstraints,allcateRoom,deallocateRoom);
export default router;

