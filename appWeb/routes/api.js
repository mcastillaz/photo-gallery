const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users');
const photoController = require('../controllers/photo');
const albumController = require('../controllers/albums');

//user
router.post('/api/signup', userController.neWusers);
//router.post('/api/signin', );


//Photos
router.post('/api/uploadPhoto/:id', photoController.uploadPhoto);
router.get('/api/allPhotos/:id', photoController.allPhotosUser);
router.get('/api/detailPhoto/:id',photoController.detailPhoto);
router.delete('/api/deletePhoto/:id',photoController.deletePhoto);
router.post('/api/search/:id/',photoController.searchPhoto);

//
router.post('/api/newAlbum/:id', albumController.newAlbums);
router.get('/api/allAlbum/:id', albumController.allAlbums);
router.get('/api/detailAlbum/:id', albumController.detailAlbums);
router.put('/api/updateAlbum/:id',albumController.updateAlbums);
router.delete('/api/deleteAlbum/:id,', albumController.deleteAlbums);


module.exports = router; 