import ApplicableApplicants from "../../models/applicable-applicants.mjs";

export default async function(req, res) {
    try {
        const { applicableApplicants } = req.body;
        await ApplicableApplicants.create(req.body);
        res.status(200);

    } catch(err) {
        res.status(400).json({ "status": "failed", "message": err.message });
    }
    
}