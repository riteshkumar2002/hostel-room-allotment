import mongoose from "mongoose";

import Allocation from "../../models/allocation.js";
import User from "../../models/user.js";
import Room from "../../models/room.js";

export default async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { admissionNumber } = req.body;

        const allocation = await Allocation.findOneAndDelete({ admission_no: admissionNumber });

        if (!allocation) {
            return res.status(404).json({ error: 'Room allocation not found' });
        }

        const roomNumber = allocation.room_number;
        await Room.updateOne({room_number:allocation.room_number},{$pull:{allocated_to:admissionNumber}});
        
        await session.commitTransaction();

        res.status(200).json({ message: 'Room deallocated successfully', allocation });
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({ error: err.message });
    } finally {
        session.endSession();
    }
}