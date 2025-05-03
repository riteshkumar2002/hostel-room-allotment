import User from "../../models/user.js";
import Allocation from "../../models/allocation.js";
import AllocationRequest from "../../models/allocation-request.mjs";

export default async (req, res) => {
    try {
        const admissionNumber = req.body.admissionNumber;
        const roomNumbers = req.body.roomNumbers;

        const user = await User.findOne({ admission_number: admissionNumber });

        if(user == null) {
            return res.status(404).json({ "message": "user not found" });
        }

        const allocation = await Allocation.findOne({ admission_number: admissionNumber });

        if(allocation != null) {
            return res.status(401).json({ "message": "user is already allocated a room" });
        }

        const allocationRequest = await AllocationRequest.create({
            admission_number: admissionNumber,
            room_numbers: roomNumbers
        });


        res.status(201).json(allocationRequest);
    } catch (err) {
        res.status(400).json({ "message": err.message });
    }
}