const User = require('../models/Albums');

const newAlbums = async function (req, res){
    try{
        const {id} = req.params;
        const {name,photo} =  req.body;
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

const allAlbums = async function (req, res) {
    try {
        const {id} = req.params;
        const albums = await Albums.find({ userid:id }).sort({ created_at: 'desc' });
        return res.status(200).json(albums);

    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const detailAlbums = async function (req, res){
    try{   
    const {id} = req.params;
       const detailAlbums = await detailAlbums.findById(id).sort({ created_at: 'desc' });
       return res.status(200).json(detailAlbums);
    }catch{
        return res.status(500).json({ message: e.message });
    }

};

const updateAlbums = async function (req, res){
    try{
        const {id} = req.params;
        const updateAlbum = await detailAlbums.findByIdAndUpdate(id, req.body, {new: true}).sort({ created_at: 'desc' });
        return res.status(200).json(updateAlbum);
    }catch(e){
        return res.status(500).json({message:e.message});
    }
};

const deleteAlbums = async function (req, res){
     try{
        const { id } = req.params;
        const Album = await Albums.photo.findByIdAndDelete(id);
        return res.status(200).json({ message: 'album photo deleted' });

     }catch(e){
        return res.status(500).json({message:e.message});
     }
};

module.exports = {
    newAlbums,
    allAlbums,
    detailAlbums,
    updateAlbums,
    deleteAlbums
};






