import mongoose from "mongoose";

const claimerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    }
});

const Claimer = mongoose.model('Claimer', claimerSchema);
export default Claimer;