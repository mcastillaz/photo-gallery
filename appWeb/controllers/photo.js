
const Photo = require('../models/Photo');
const uuid = require('uuid/v4');
const fs = require('fs');
const { unlink } = require('fs-extra');
const _ = require('lodash');
const PATH = require('path');

const uploadPhoto = async function (req, res) {
    try {
        const {title,originalname,mimetype,size,imageB64} =  req.body;
        const {id} = req.params; 

        if(_.isEmpty(imageB64)) throw new Error('Es necesario subir una foto');
        let filename = uuid()+PATH.extname(originalname);
        let pathRelative ='/photos/uploads'
        let path =PATH.join(__dirname, '../public'+pathRelative);
        let pathImage = `${path}/${filename}`;

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path,0744);
          }

        fs.writeFileSync(pathImage,imageB64,'base64');
        const photo = new Photo();
        photo.title =title;
        photo.originalname = originalname;
        photo.mimetype = mimetype;
        photo.size = size;
        photo.filename = filename;
        photo.path =  `${pathRelative}/${filename}`;
        photo.userid = id;//Se toma el id del usuario para enlazarlo con la foto
        await photo.save();

        return res.status(200).json(photo);

    } catch (e) {
        return res.status(400).json({ message: e.message });
    }

};

const allPhotosUser = async function (req, res) {
    try {
        const {id} = req.params;
        const photo = await Photo.find({ userid:id }).sort({ created_at: 'desc' });
        return res.status(200).json(photo);

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const detailPhoto = async function (req, res) {
    try {

        const { id } = req.params;
        const photo = await Photo.findById(id);
        return res.status(200).json(photo);

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const deletePhoto = async function (req, res) {
    try {

        const { id } = req.params;
        const photoDeleted = await Photo.findByIdAndDelete(id);
        await unlink(PATH.resolve('./appWeb/public' + photoDeleted.path));
        return res.status(200).json({ message: 'Exitoso' });

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};


const searchPhoto = async function asyn(req, res) {
    try {
        const {params: {id}, body:{dateSearch,nameSearch}} = req;

        let filter = {userid: id}; 

        if(!_.isEmpty(nameSearch)){
            filter.title = nameSearch;
        }
        if(!_.isEmpty(dateSearch)){
            let gte = `${searchdate}T00:00:00Z`
            let lt = `${searchdate}T23:59:59Z`
            filter.created_at = { $gte: new Date(gte), $lt: new Date(lt)};
        }
        const photo = await Photo.find(filter).sort({ created_at: 'desc' });
        return res.status(200).json(photo);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    uploadPhoto,
    allPhotosUser,
    detailPhoto,
    deletePhoto,
    searchPhoto
};