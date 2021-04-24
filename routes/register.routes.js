const app = require('express').Router()
const { validationResult } = require('express-validator');
const validation = require('../validators/register.validation');
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');

app.get('/' , (req, res)=>{

    res.render('register' , {errors:req.flash('errors') , oldInputs:req.flash('oldInputs'), exists:req.flash('exists'), isLoggedIn:false })
})

/* Engy section  */

app.post('/handleSignUp', validation , async (req, res)=>{
console.log("signUp");
    const {name,email,password} = req.body
    console.log(email);
    let errors = validationResult(req)
   // console.log(errors);
    console.log(errors.array());
    console.log(errors.isEmpty());
    console.log(req.body);

    if(errors.isEmpty()){
      
     let user = await userModel.findOne({email})
     console.log(user);
     if(user){
    
        req.flash('exists' , true)
        res.redirect('/')
     }else{
        bcrypt.hash(password, 7, async(err, hash)=> {
            // Store hash in your password DB.
            await userModel.insertMany({name,email,password:hash})
            res.redirect('/login')
        });
        
     }
      
    }else{

        req.flash('errors' , errors.array())
        req.flash('oldInputs' ,{name,email,password})
        res.redirect('/')
    }
    
});



module.exports = app