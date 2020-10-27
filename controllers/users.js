const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

users.get('/new', (req, res) => {
  res.render('users/new.ejs', {currentUser: req.session.currentUser})
})

users.get('/userlist', (req, res) => {
  User.find({}, (error, allUsers)=>{
      res.render('users/users.ejs', {users: allUsers});
  });
})

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password,
  bcrypt.genSaltSync(10))
  User.create(req.body, (err, createUser) => {
    console.log('user is created', createUser)
    res.redirect('/')
  })
})

//settings route
users.get('/settings/:id', (req, res)=>{
  console.log(req.params.id)
  User.findById(req.params.id, (err, foundUser)=>{
    res.render('users/settings.ejs', {
      user:foundUser,
    });
  });
});

//delete route
users.delete('/settings/:id', (req, res)=>{
  User.findByIdAndRemove(req.params.id, (err, foundUser) => {
    if(err) console.log(err);
  });
	res.redirect('/');
});

module.exports = users
