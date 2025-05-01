import express from 'express';
const router = express.Router();


import Constraint from '../models/constraint.js';
import Room_allocation_request from '../models/room_allocation_request.js';
import Signup from '../models/signup.js';
import Allocation from '../models/allocation.js';
import Room from '../models/room.js';

// POST: Add Constraint
router.post('/add-constraint', async (req, res) => {
    try {
        const { start_room, end_room, ...rest } = req.body;

        const startRoom = await Room.findOne({ room_no: start_room });
        const endRoom = await Room.findOne({ room_no: end_room });

        if (!startRoom || !endRoom) {
            return res.status(404).json({ error: 'Start or End room not found' });
        }

        const startIndex = startRoom.index;
        const endIndex = endRoom.index;

        if (startIndex > endIndex) {
            return res.status(400).json({ error: 'Start room must be before End room' });
        }

        const conflictingConstraints = await Constraint.find({
            $or: [
                {
                    start_room_index: { $lte: endIndex },
                    end_room_index: { $gte: startIndex }
                }
            ]
        });

        if (conflictingConstraints.length > 0) {
            return res.status(409).json({
                error: 'This room range conflicts with existing constraints',
                conflicts: conflictingConstraints
            });
        }

        const newConstraintData = {
            ...rest,
            start_room,
            end_room,
            start_room_index: startIndex,
            end_room_index: endIndex
        };

        const new_constraint = await Constraint.create(newConstraintData);
        res.status(201).json(new_constraint);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

// GET: Find Next Room
router.get('/find-next-room', async (req, res) => {
    try {
        const start_room = req.query.start_room;
        const noOfRoom = parseInt(req.query.noOfRoom, 10);

        if (!start_room || isNaN(noOfRoom)) {
            return res.status(400).json({ message: 'Missing or invalid parameters' });
        }

        const startRoomDetails = await Room.findOne({ room_no: start_room });

        if (!startRoomDetails) {
            return res.status(404).json({ message: 'Start room not found' });
        }

        const startRoomIndex = startRoomDetails.index;
        const lastRoomIndex = startRoomIndex + noOfRoom - 1;

        const lastRoomDetails = await Room.findOne({ index: lastRoomIndex });

        if (!lastRoomDetails) {
            return res.status(404).json({ message: 'Next room not found' });
        }

        return res.status(200).json({ next_room_no: lastRoomDetails.room_no });
    } catch (error) {
        console.error('Error finding next room:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// POST: Room Allocation Request
router.post('/room_allocation_req', async (req, res) => {
    try {
        const new_req = await Room_allocation_request.create(req.body);
        res.status(201).json(new_req);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST: Signup
router.post('/signup', async (req, res) => {
    try {
        const new_stu = await Signup.create(req.body);
        res.status(201).json(new_stu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: All Constraints
router.get('/get-constraints', async (req, res) => {
    try {
        const constraints = await Constraint.find();
        res.status(200).json(constraints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Constraint by ID
router.delete('/delete-constraint/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedConstraint = await Constraint.findByIdAndDelete(id);

        if (!deletedConstraint) {
            return res.status(404).json({ message: 'Constraint not found' });
        }

        res.status(200).json({ message: 'Constraint deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Allocate Room
router.post('/allocate-room', async (req, res) => {
    try {
        const newAllocation = await Allocation.create(req.body);
        res.status(201).json(newAllocation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Deallocate Room
router.delete('/deallocate-room', async (req, res) => {
    try {
        const { admissionNo } = req.body;

        const student = await Signup.findOne({ admissionNo });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const deletedAllocation = await Allocation.findOneAndDelete({ studentId: student._id });
        if (!deletedAllocation) {
            return res.status(404).json({ error: 'Room allocation not found' });
        }

        res.status(200).json({ message: 'Room deallocated successfully', deletedAllocation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

