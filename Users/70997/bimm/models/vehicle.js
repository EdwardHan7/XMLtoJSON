const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    makeId: String,
    makeName: String,
    vehicleTypes: [
        {
            typeId: String,
            typeName: String
        }
    ]
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
