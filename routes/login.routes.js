const app = require('express').Router()
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');

/* kirolseid section */


app.get('/login', (req, res) => {
    // console.log(req.flash("incorrect"));
    if(req.session.islogin){
        res.redirect('/home')
    }else{
        res.render('login.ejs',{exists: req.flash('exists'),incorrect:req.flash('incorrect'),isloggin:false})
    }
});

app.post('/handleSignin', async (req, res) => {
    // console.log(req.body);
   const { email, password} =req.body
   let user =await userModel.findOne({email})
   if(user){
        const match = await bcrypt.compare(password, user.password);

        if(match) {
            req.session.islogin = true
            req.session.userID=user._id
          
            res.redirect('/home')
            
        }else{
            req.flash('incorrect', true)
            res.redirect('/login')
        }
       
   }else{
            req.flash('exists', true)
            res.redirect('/login')
        }
  
    
});




module.exports = app




