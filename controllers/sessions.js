const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser
  })
})

//on sessions form submit (log in)
sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username}, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send('Database error')
    } else if (!foundUser) {
      //if found user is undefined/null (not found)
      res.send('<a href="/">User not found </a>')
    } else {
      //the user is found

      //if the passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        //add the user to our session
        req.session.currentUser = foundUser
        //redirect back to our homepage
        res.redirect('/')
      } else {
        //the passwords do not match
        res.send('<a href="/"> Wrong password </a>')
      }
    }

  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions
