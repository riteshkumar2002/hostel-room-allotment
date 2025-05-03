import { Router } from "express";

import addConstraint from './add-constraint.mjs';
import deleteConstraint from './delete-constraint.mjs'
import getConstraints from './get-constraints.mjs'

import approveAll from './approve-all.mjs'
import approveAllocation from './approve-allocation.mjs'

import getAllAllocationRequests from "./get-all-allocation-requests.mjs"

import allocateRoom from './allocate-room.mjs'
import deallocateRoom from './deallocate-room.mjs'
import applicableApplicants from './applicable-applicants.mjs'

const router = Router();

router.use(
    '/admin',
    addConstraint,
    approveAll,
    approveAllocation,
    deleteConstraint,
    getConstraints,
    allocateRoom,
    deallocateRoom,
    applicableApplicants,
    getAllAllocationRequests,
);
export default router;

