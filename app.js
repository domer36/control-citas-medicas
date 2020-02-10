require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

mongoose.connect(process.env.DB, {useUnifiedTopology: true, useNewUrlParser: true})
.then(db => console.log( 'DB connected'))
.catch(err => console.log(console.error(err)))

const app = express()

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/'))
app.use('/', require('./routes/DoctorRoutes'))
app.use('/', require('./routes/RecepcionistaRoutes'))

app.listen(3000, ()=> console.log('Server ready on http://localhost:3000'))