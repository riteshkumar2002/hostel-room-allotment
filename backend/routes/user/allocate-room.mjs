
router.post('/allocate-room', async (req, res) => {
    try {
        const newAllocation = await Allocation.create(req.body);
        res.status(201).json(newAllocation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});