const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema de l'objet Chicken
const chickenSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        default: Date.now
    },
    weight: {
        type: Number,
        required: true
    },
    step: {
        type: Number,
        required: true,
        default: 0
    },
    isRunning: {
        type: Boolean,
        required: true,
        default: false
    },
    farmyard: {
        type: Schema.Types.ObjectId,
        ref: 'Farmyard'
    }
});

// Model Chicken
const Chicken = mongoose.model('Chicken', chickenSchema);

module.exports = Chicken;