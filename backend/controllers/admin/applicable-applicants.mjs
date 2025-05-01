import ApplicableApplicants from "../../models/applicable-applicants.mjs";

export default async function(req, res) {
    console.log(req.body);
    try {
        const { applicableApplicants } = req.body;
        const x = await ApplicableApplicants.create(req.body);
        console.log("here", x)
        res.status(200).json({ "status": "success" });

    } catch(err) {
        res.status(500).json({ "status": "failed", "message": err.message });
    }
    
}