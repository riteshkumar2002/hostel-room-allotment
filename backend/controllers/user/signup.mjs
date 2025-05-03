import User from '../../models/user.js'
import ApplicableApplicants from '../../models/applicable-applicants.mjs';

export default async (req, res) => {
    try {
        // TODO: validate json 
        const admissionNumber = req.body.admissionNumber;

        const found = await ApplicableApplicants.findOne({
            applicable_applicants: { $in: [admissionNumber] }
        });
        console.log(found);
        
        if(found) {
            const new_stu = await User.create({
                "name": req.body.name,
                "email": req.body.email,
                "mobile_number": req.body.mobileNumber,
                "password": req.body.password,
                "admission_number": req.body.admissionNumber,
                "branch": req.body.branch,
                "year": req.body.year,
                "program": req.body.program,
                "course": req.body.course,
            });
            res.status(201).json(new_stu);
        } else {
            res.status(400).json({error: "You are not allowed for this hostel"});
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}