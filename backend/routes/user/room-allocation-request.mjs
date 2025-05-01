
router.post('/room-allocation-request', async (req, res) => {
    try {
        const new_req = await Room_allocation_request.create(req.body);
        res.status(201).json(new_req);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});