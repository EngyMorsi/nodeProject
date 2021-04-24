const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title:String,
    desc:String,
    userID:mongoose.Schema.Types.ObjectId
    //userID:{type:mongoose.Schema.Types.ObjectId , ref: 'user'}
})

module.exports = mongoose.model('note' , noteSchema)