const app = require('express').Router()
const { validationResult } = require('express-validator');
const validation = require('../validators/register.validation');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');

app.get('/' , (req, res)=>{

    res.render('register' , {errors:req.flash('errors') , oldInputs:req.flash('oldInputs'), exists:req.flash('exists'), isLoggedIn:false })
})

/* Engy section  */




module.exports = app