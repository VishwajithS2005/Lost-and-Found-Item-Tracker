import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dateSubmitted: {
        type: Date,
        default: Date.now
    },
    foundAt: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['unclaimed', 'claimed'],
        default: 'unclaimed',
    },
    foundBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Finder',
        required: true
    },
    claimedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Claimer'
    }
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);
export default Item;