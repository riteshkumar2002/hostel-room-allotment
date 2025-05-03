import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ApplicableApplicants = new Schema({
    "applicableApplicants": {
        type: [String],
        required: true
    }
});

const tableName = "ApplicableApplicants";
export default mongoose.model(tableName, ApplicableApplicants, tableName);
