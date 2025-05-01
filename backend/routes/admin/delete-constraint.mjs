
router.delete('/delete-constraint/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedConstraint = await Constraint.findByIdAndDelete(id);

        if (!deletedConstraint) {
            return res.status(404).json({ message: 'Constraint not found' });
        }

        res.status(200).json({ message: 'Constraint deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});