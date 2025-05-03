import Constraint from "../../models/constraint.js";

export default async (req, res) => {
    try {
        const constraints = await Constraint.find();
        res.status(200).json(constraints);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}