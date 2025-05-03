import User from "../../models/user.js";

export default async function login(req, res) {
    try {
        console.log(req.body);
        const user = await User.findOne({ adm_no: req.body.adm_no });
        console.log(user);

        if(user.password === req.body.password) {
        res.status(200).json({ "status": "success" });

        }
        else {
            res.status(401).json({"status": "failed", "message": "incorrect password"})
        }
    } catch(err) {
        res.status(500).json({ "status": "failed", "message": err.message });
    }


}