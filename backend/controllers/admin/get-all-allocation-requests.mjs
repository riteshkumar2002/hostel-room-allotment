import User from "../../models/user.js";
import AllocationRequest from "../../models/allocation-request.mjs";

export default async function getAllAllocationRequests(req, res) {
    try {
        const allocations = await AllocationRequest.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "admission_number",
                    foreignField: "admission_number",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            },
            {
                $project: {
                    _id: 1,
                    admission_number: 1,
                    room_numbers: 1,
                    name: "$userDetails.name"
                }
            }
        ]);

        res.status(200).json(allocations.map(e => {
            const _id = e._id;
            const name = e.name;
            const admissionNumber = e.admission_number;
            const roomNumbers = e.room_numbers;

            return {
                _id,
                name,
                admissionNumber,
                roomNumbers
            }
        }));

    } catch(err) {
        res.status(500).json({ "status": "failed", "message": err.message });
    }
}
