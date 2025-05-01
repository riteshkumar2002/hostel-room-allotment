export default async (req, res) => {
    try {
        const { admissionNo } = req.body;

        const student = await Signup.findOne({ admissionNo });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const deletedAllocation = await Allocation.findOneAndDelete({ studentId: student._id });
        if (!deletedAllocation) {
            return res.status(404).json({ error: 'Room allocation not found' });
        }

        res.status(200).json({ message: 'Room deallocated successfully', deletedAllocation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}