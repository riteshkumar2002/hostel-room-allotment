import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ApplicableApplicants = new Schema({
    "applicable_applicants": {
        type: [String],
        required: true
    }
});

export default mongoose.model('ApplicableApplicants', ApplicableApplicants);

