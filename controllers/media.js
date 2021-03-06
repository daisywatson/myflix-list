const express = require('express')
const router = express.Router()
const Movies = require('../models/movies.js')
const Shows = require('../models/tvshows.js')
const Media = require('../models/media.js')
const Users = require('../models/users.js')

//user authentication
const isAuthenticated = (req, res, next) =>  {
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
	}
}

//new router
router.get('/new', (req, res)=>{
    res.render('media/new.ejs', { currentUser: req.session.currentUser });
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

   req.body.userID = req.session.currentUser._id

   Media.create(req.body, (error, createdMedia)=>{
       res.redirect('/media')
   });
});


//index router
router.get('/', (req, res)=>{
    Media.find({}, (error, allMedia)=>{
        res.render('media/index.ejs', {
            movies: allMedia,
            currentUser: req.session.currentUser
        });
    });
});

//list shown to other users (not editable/deletable)
router.get('/users/:id', (req, res)=>{
    Media.find({}, (error, allMedia)=>{
    res.render('media/index-otheruser.ejs', {
      movies: allMedia,
      currentUser: req.session.currentUser,
      viewUserID: req.params.id
    });
  });
});

//show route
router.get('/:id', isAuthenticated, (req, res)=>{
  Media.findById(req.params.id, (err, foundMedia)=>{
    res.render('media/show.ejs', {
      media:foundMedia,
      currentUser: req.session.currentUser
    });
  });
});

//delete route
router.delete('/:id', isAuthenticated, (req, res)=>{
  Media.findByIdAndRemove(req.params.id, (err, foundMedia) => {
    if(err) console.log(err);
  });
	res.redirect('/media');
});

//edit route
router.get('/:id/edit', (req, res)=>{
    Media.findById(req.params.id, (err, foundMedia)=>{
        res.render(
    		'media/edit.ejs',
    		{
    			media: foundMedia,
          currentUser: req.session.currentUser
    		}
    	);
    });
});

router.put('/:id', isAuthenticated, (req, res)=>{
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

  Media.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
    res.redirect('/media/' + req.params.id);
  });
});

module.exports = router
