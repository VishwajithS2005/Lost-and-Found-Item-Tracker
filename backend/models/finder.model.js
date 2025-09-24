import mongoose from "mongoose";

const finderSchema = new mongoose.Schema({
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

const Finder = mongoose.model('Finder', finderSchema);
export default Finder;