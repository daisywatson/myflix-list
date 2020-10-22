const express = require('express')
const router = express.Router()
const Movies = require('../models/movies.js')
const Shows = require('../models/tvshows.js')
const Media = require('../models/media.js')

//new router
router.get('/new', (req, res)=>{
    res.render('media/new.ejs');
});

router.post('/', (req, res)=>{
  if(req.body.movie === 'on'){
    req.body.movie = true;
   } else {
    req.body.movie = false;
   }
   if (req.body.released === 'on') {
     req.body.released = true;
   } else {
     req.body.released = false;
   }
   if (req.body.watched === 'on') {
     req.body.watched = true;
   } else {
     req.body.watched = false;
   }

   Media.create(req.body, (error, createdMedia)=>{
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
