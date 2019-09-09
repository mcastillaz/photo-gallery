const User = require('../models/Albums');

const newAlbums = function (req, res){
    try{
        const {name,photo} =  req.body;
        const {id} = req.params; 
        const newAlbums = new Albums();

        newAlbums.name = name;
        newAlbums.userid = id;
        newAlbums.photo = photo;
        
        await Albums.save(newAlbums);
        return res.status(200).json(newAlbums);

    }catch(e){

        return res.status(500).json({message:e.message});
    }

};




