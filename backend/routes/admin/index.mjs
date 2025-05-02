import { Router } from "express";

import addConstraint from './add-constraint.mjs';
import deleteConstraint from './delete-constraint.mjs'
import getConstraints from './get-constraints.mjs'

import approveAll from './approve-all.mjs'
import approveAllocation from './approve-allocation.mjs'

import allcateRoom from './allocate-room.mjs'
import deallocateRoom from './deallocate-room.mjs'
import applicableApplicants from './applicable-applicants.mjs'

const router = Router();

router.use('/admin',addConstraint,approveAll,approveAllocation,deleteConstraint,getConstraints,allcateRoom,deallocateRoom,applicableApplicants);
export default router;

