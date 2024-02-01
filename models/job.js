const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
     company: {
        type: String,
        required: [true, 'Please provide company name'],
        max: 50,
     },
     position: {
        type: String,
        required: [true, 'Please provide position name'],
        max: 150, 
     },
     status: {
        type: String,
        enum: ['pending', 'interview', 'declined', 'selected'],
        default: 'pending'
     },
     createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user id']
     }
}, {timpestamps: true})


module.exports = mongoose.model('Job', jobSchema)