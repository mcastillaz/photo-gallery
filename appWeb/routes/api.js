const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users');
const photoController = require('../controllers/photo');

//user
router.post('/api/signup', userController.neWusers);
router.post('/api/signin', passport.authenticate('local'));


//Photos
router.post('/api/uploadPhoto/:id', photoController.uploadPhoto);
router.get('/api/allPhotos/:id', photoController.allPhotosUser);
router.get('/api/detailPhoto/:id',photoController.detailPhoto);
router.delete('/api/deletePhoto/:id',photoController.deletePhoto);
router.post('/api/search/:id/',photoController.searchPhoto);


module.exports = router; 