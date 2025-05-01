
router.post('/sign-up', async (req, res) => {
    try {
        const new_stu = await Signup.create(req.body);
        res.status(201).json(new_stu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});