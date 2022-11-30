const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema de l'objet Farmyard
const farmyardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    maxQuantity: {
        type: Number,
        required: true
    },
    chickens: [{
        type: Schema.Types.ObjectId,
        ref: 'Chicken'
    }]
});

// Model Farmyard
const Farmyard = mongoose.model('Farmyard', farmyardSchema);

module.exports = Farmyard;