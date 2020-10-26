const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session')
require('dotenv').config()

const app = express();

const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

mongoose.connect(mongodbURI, { useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

//controllers
const mediaController = require('./controllers/media.js')
app.use('/media', mediaController)

const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

//Home route
app.get('/', (req, res) => {
  res.render('media/home.ejs', {currentUser: req.session.currentUser})
})

app.listen(PORT, ()=>{
    console.log('listening');
});
