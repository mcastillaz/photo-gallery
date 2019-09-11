const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const photoController = require('../controllers/photo');
const albumController = require('../controllers/albums');
const auth = require('../helpers/auth');

//user
router.post('/api/signup', userController.neWusers);
router.post('/api/signin', userController.loginUser);


//Photos
router.post('/api/uploadPhoto/:id', auth, photoController.uploadPhoto);
router.get('/api/allPhotos/:id', auth, photoController.allPhotosUser);
router.get('/api/detailPhoto/:id',auth, photoController.detailPhoto);
router.delete('/api/deletePhoto/:id', auth, photoController.deletePhoto);
router.post('/api/search/:id/', auth, photoController.searchPhoto);

//
router.post('/api/newAlbum/:id', auth, albumController.newAlbums);
router.get('/api/allAlbum/:id', auth, albumController.allAlbums);
router.get('/api/detailAlbum/:id', auth, albumController.detailAlbums);
router.put('/api/updateAlbum/:id', auth, albumController.updateAlbums);
router.delete('/api/deleteAlbum/:id', auth, albumController.deleteAlbums);


module.exports = router; 