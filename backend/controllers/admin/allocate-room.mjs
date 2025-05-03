import Allocation from '../../models/allocation.js'
import Room from '../../models/room.js';
import SignUp from "../../models/signup.js";


export default async (req, res) => {
    try {
        const admissionNumber = req.body.admissionNumber;
        const studentDetails = await SignUp.findOne({ adm_no: admissionNumber })

        if(studentDetails == null) {
            res.status(404).json({ "message": "student not found" });
            return;
        }

        const roomDetails = await Room.findOne({room_no:req.body.roomNum});

        if(!roomDetails){
            res.status(404).json({'message' :"room not found"});
            return;
        }

        const roomCapacity = roomDetails.capacity;
        const allocatedTo = roomDetails.allocated_to;

        if(allocatedTo.length === roomCapacity){
            res.status(409).json({'message' :"room is full"});
            return;
        }

        await Room.updateOne({room_no:roomDetails.room_no},{$push:{allocated_to:admissionNumber}});

        const newAllocation = await Allocation.create({admission_no:admissionNumber, room_no:req.body.roomNum});
        res.status(201).json(newAllocation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}