import Allocation from '../../models/allocation.js'
import Room from '../../models/room.js';
import User from "../../models/user.js";


export default async (req, res) => {
    try {
        const admissionNumber = req.body.admissionNumber;
        const user = await User.findOne({ admission_number: admissionNumber })

        if(user == null) {
            res.status(404).json({ "message": "student not found" });
            return;
        }

        const room = await Room.findOne({room_number:req.body.roomNumber});
        console.log(room);

        if(!room){
            res.status(404).json({'message' :"room not found"});
            return;
        }

        const roomCapacity = room.capacity;
        const allocatedTo = room.allocated_to;

        if(allocatedTo.length === roomCapacity){
            res.status(409).json({'message' :"room is full"});
            return;
        }

        const updatedRoom = await Room.updateOne({room_number:room.room_number},{$push:{allocated_to:admissionNumber}});
        console.log(updatedRoom);

        const newAllocation = await Allocation.create({admission_no:admissionNumber, room_number:req.body.roomNumber});
        res.status(201).json(newAllocation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}