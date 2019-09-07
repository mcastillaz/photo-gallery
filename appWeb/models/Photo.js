const { Schema, model } = require('mongoose');//importo solo el esquema y el modelo

const photoSchema = new Schema({
    title: {type: String},
    description: {type: String},
    filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: { type: Number},
    created_at: {type: Date, default: Date.now()},
    userid:{type:String}
});

module.exports = model('Photo', photoSchema);