const app = require('express').Router()
const auth = require('../middleware/auth');
const noteModel = require('../models/notes.model')

/* taqwa section  */




app.post('/addNote' , async (req, res)=>{

    const {title,desc} = req.body
    await noteModel.insertMany({userID:req.session.userID, title , desc})
    res.redirect('/home')
})
/*
app.get('/delete/:id' , async (req, res)=>{

    console.log(req.params.id);
    await noteModel.findByIdAndDelete({_id: req.params.id})
    res.redirect('/home')
})
*/
app.post('/delete' , async (req, res)=>{

    console.log(req.body);
    await noteModel.findByIdAndDelete({_id: req.body.deleteNt})
    res.redirect('/home')
})


module.exports = app