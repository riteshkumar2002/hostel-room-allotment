import Signup from '../../models/signup.js'
import applicableApplicants from '../../models/applicable-applicants.mjs';

export default async (req, res) => {
    try {
        const adm_no = req.body.adm_no;
        
        const found = await applicableApplicants.findOne({
            applicableApplicants: { $in: [adm_no] }
        });
        
        if(found) {
            const new_stu = await Signup.create(req.body);
            res.status(201).json(new_stu);
        } else {
            res.status(400).json({error: "You are not allowed for this hostel"});
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}