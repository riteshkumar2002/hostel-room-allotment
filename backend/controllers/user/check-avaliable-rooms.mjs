import Constraint from "../../models/constraint.js";

export default async function checkAvailableRooms(req, res) {
    try {
        const constraint = await Constraint.findOne({ 
            "program": req.body.program,
            "year": req.body.year,
            "branch": req.body.branch
        });

        console.log(constraint);
    }
}