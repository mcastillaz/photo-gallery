const { Schema, model } = require('mongoose');//importo solo el esquema y el modelo

const albumSchema = new Schema({
    name: {type: String},
    photo: [String],
    created_at: {type: Date, default: Date.now()},
    userid:{type:String}
});

module.exports = model('Albums', albumSchema);

