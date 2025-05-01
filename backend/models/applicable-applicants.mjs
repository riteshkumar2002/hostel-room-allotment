import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ApplicableApplicants = new Schema({
    "applicableApplicants": {
        type: [String],
        required: true
    }
});

export default mongoose.model('applicableapplicants', ApplicableApplicants);

