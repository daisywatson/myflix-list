const express = require('express')
const router = express.Router()
const Movies = require('../models/movies.js')
const Shows = require('../models/tvshows.js')
const Media = require('../models/media.js')

//new router
router.get('/new', (req, res)=>{
    res.render('media/new.ejs', { currentUser: req.session.currentUser });
});

router.post('/', (req, res)=>{
   Media.create(req.body, (error, createdFruit)=>{
       res.redirect('/media')
   });
});


//index router
router.get('/', (req, res)=>{
    Media.find({}, (error, allMedia)=>{
        res.render('media/index.ejs', {
            movies: allMedia
        });
    });
});

module.exports = router
