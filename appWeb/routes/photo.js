const express = require('express');
const router = express.Router();
const { unlink } = require('fs-extra');
const path = require('path');
const Photo = require('../models/Photo');
const { isAuthenticated } = require('../helpers/auth');

router.get('/general', async (req, res) => {//Bienvenida - manejar de peticiones
    const photo = await Photo.find();
    //console.log(photos);
    res.render('photos/all-photo', { photo });
   
});

/*router.get('/about', (req, res) => {
    res.render('about');
  });
*/

router.get('/upload', (req, res) => {
    res.render('photos/upload-photo');
});

router.post('/upload',  async (req, res) => {
    const photo = new Photo();
    
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.filename = req.file.filename;
    photo.path = '/photos/uploads/' + req.file.filename;
    photo.originalname = req.file.originalname;
    photo.mimetype = req.file.mimetype;
    photo.size = req.file.size;
    photo.userid = req.user.id;//Se toma el id del usuario para enlazarlo con la foto
    
    await photo.save();
    console.log(photo);
    //console.log(req.file);//Description the file wthat upload - cuando se ejecuta el Middlewares un odjeto se guarda en file
    res.redirect(301,'/photo');
});

router.get('/photo',  async (req, res) =>{
   
    console.log(req.user.id);
    const photo = await Photo.find({userid: req.user.id}).sort({created_at: 'desc'});
    console.log(photo);
    res.render('photos/all-photo', { photo });//pasale los datos de las fotos a la vista
});

router.get('/photo/:id', async (req, res) => {//Mostrar una unica foto
     const { id } = req.params;
     const photo = await Photo.findById(id);
     console.log(photo);
     res.render('photos/photo-detail', { photo });
  });

  router.get('/search/name', async (req, res) => {//Mostrar una foto por nombre
    const { title } = req.params;
    const photo = await Photo.findById(title);
    console.log(photo);
    res.render('photos/photo-detail', { photo });
 });

router.get('/photo/:id/delete', async (req, res) => { //eliminar una sola foto
    const { id } = req.params;
    const photoDeleted = await Photo.findByIdAndDelete(id);
    await unlink(path.resolve('./appWeb/public' + photoDeleted.path));//recibe la direccion del archivo que quiero eliminar
    res.redirect('photos/all-photo');
});

module.exports = router;