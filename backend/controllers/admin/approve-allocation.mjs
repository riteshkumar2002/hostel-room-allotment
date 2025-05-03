import mongoose from "mongoose";

import Room from "../../models/room.js";
import Allocation from "../../models/allocation.js";
import AllocationRequest from "../../models/allocation-request.mjs";

export default async(req, res) => {
    const session = await mongoose.startSession();

    try {
        const id = req.body._id;
        const allocationRequest = await AllocationRequest.findOne({ _id: id });

        if(allocationRequest == null) {
            throw ReferenceError("allocationRequest not found!");
        }

        const rooms = await Room.find({ room_number: { $in: allocationRequest.room_numbers } });
        const availabilities = new Map();

        rooms.forEach(room => {
            availabilities[room.room_number] = room.capacity - room.allocated_to.length;
        });

        console.log(availabilities);
        console.log(rooms);

        const roomNumbers = allocationRequest.room_numbers;
        let allocated = false;

        for(const roomNumber of roomNumbers) {
            if(availabilities[roomNumber] > 0) {
                session.startTransaction();

                await AllocationRequest.findOneAndDelete({ admission_number: allocationRequest.admission_number }, { session });

                await Room.findOneAndUpdate({ room_number: roomNumber }, { $push: {
                    allocated_to: allocationRequest.admission_number
                }}, { session });

                await Allocation.create([{
                    admission_number: allocationRequest.admission_number, 
                    room_number: roomNumber
                }], { session });

                await session.commitTransaction();
                allocated = true;
                break;
            }
        }

        if(allocated) {
            res.status(200).json({ "status": "success" });
        } else {
            res.status(404).json({ "status": "failure", "message": "no vacant room available" });
        }
    } catch(err) {
        await session.abortTransaction();
        res.status(500).json({ "status": "failed", "message": err.message });
    } finally {
        await session.endSession();
    }
}