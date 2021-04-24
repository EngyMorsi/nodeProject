const express = require('express')
const app = express()
const port = 3000
const path = require('path')
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
  uri: 'mongodb+srv://engy:Engy123@cluster0.5zzto.mongodb.net/project1',
  collection: 'mySessions'
});
var flash = require('connect-flash');
const mongoose = require('mongoose')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store
  }))
app.use(flash());
app.use(express.static(path.join(__dirname , 'public')))
app.use(express.urlencoded({extends:false}))
app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(require('./routes/register.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/home.routes'))

app.get('/', (req, res) => res.send('Hello World!'))

mongoose.connect('mongodb+srv://engy:Engy123@cluster0.5zzto.mongodb.net/project1' , {useNewUrlParser:true,useUnifiedTopology:true}).then( ()=>{
  console.log('connected');
}).catch( ()=> {

    console.log("connection error");
})


app.listen(port, () => console.log(`Example app listening on port port!`))