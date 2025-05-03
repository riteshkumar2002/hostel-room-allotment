import mongoose from "mongoose";
import Room from "../../models/room.js";
import Allocation from "../../models/allocation.js";
import AllocationRequest from "../../models/allocation-request.mjs";

export default async(req, res)=> {
    const session = await mongoose.startSession();

    try {
        const allocationRequests =  await AllocationRequest.find();
        allocationRequests.sort(function compare(a, b) {
            if(a > b) {
                return 1;
            } else if(a == b) {
                return 0;
            } else {
                return -1
            }
        });

        const rooms = await Room.find();
        const availabilities = new Map();

        rooms.forEach(room => {
            const roomNumber = room.room_number;
            availabilities[roomNumber] = room.capacity - room.allocated_to.length;
        });

        // console.log(availabilities);

        const allocations = [];

        allocationRequests.forEach(allocationRequest => {
            const roomNumbers = allocationRequest.room_numbers;

            for(let index = 0; index < roomNumbers.length; index++) {
                const roomNumber = roomNumbers[index];

                if(availabilities[roomNumber] > 0) {
                    availabilities[roomNumber]--;

                    allocations.push({
                        admission_number: allocationRequest.admission_number,
                        room_number: roomNumber
                    });

                    break;
                }
            }
        })

        console.log(allocations);

        session.startTransaction();

        await AllocationRequest.deleteMany({}, { session });
        await Allocation.insertMany(allocations, { session });

        await Room.bulkWrite(allocations.map(allocation => {
            return {
                    updateOne: {
                        filter: { room_number: allocation.room_number },
                        update: { $push: { allocated_to: allocation.admission_number } }
                    }
                }
            }),
            { session }
        );

        await session.commitTransaction();
        res.status(200).json({ "status": "success"});

    } catch(error) {
        await session.abortTransaction();
        res.status(500).json({ "status": "failed", "message": error.message });
    } finally {
        console.log("ending session");
        await session.endSession();
    }
    
}