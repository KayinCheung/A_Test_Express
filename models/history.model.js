const mongoose = require('mongoose')

const Schema = mongoose.Schema

const historySchema = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, {
        timestamps: true,
    })

const History = mongoose.model('History', historySchema)

module.exports = History