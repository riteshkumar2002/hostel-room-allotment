import AllocationRequest from "../../models/allocation-request.mjs";

export default async function (req, res) {
    try {
        await AllocationRequest.deleteMany();
        res.status(200).json({ "status": "success" });
    } catch(err) {
        res.status(500).json({ "status": "failed", "message": err.message });
    }
}