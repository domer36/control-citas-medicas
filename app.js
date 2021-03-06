require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport = require("./config/passport");
const session = require("express-session");
const { isAuth, isAdmin } = require("./middlewares/auth");
const {FirstConfig} = require('./config/firstconfig')

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true})
.then(db => {
    FirstConfig()
})
.catch(err => console.log(console.error(err)))

const app = express()

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret:process.env.SECRET,
    resave:true,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', isAuth, (req,res,next)=>{res.render('index')})
app.use('/', require('./routes/'))
app.use('/', require('./routes/DoctorRoutes'))
app.use('/', require('./routes/RecepcionistaRoutes'))
app.use('/', require('./routes/PatientRoutes'))
app.use('/',require('./routes/UserRoutes'))
app.use('/',require('./routes/DatesRoutes'))

module.exports = app
