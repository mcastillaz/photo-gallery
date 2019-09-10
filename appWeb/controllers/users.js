const User = require('../models/User');
const bcrypt = require('bcryptjs');
const service = require('../services')

const neWusers = async function (req, res) {
    try {
        const user = new User();
        const params = req.body;
        const salt = await bcrypt.genSaltSync(10);
        const password = await req.body.password;
        const email = params.email;
        //await User.findOne({email: email})
        //if(email){ return res.status(500).json({message:'email exists'});
        //}else{
        user.name = params.name;
        user.password = bcrypt.hashSync(password, salt);
        user.email = email;
        await user.save();

        
        //return res.status(200).json(user);
       // }
    }catch (e) {
        return res.status(500).json({message:e.message});
    }
};

const loginUser = async function(req, res) {
    try{
        
        const searchemail = await User.findOne({ email: req.body.email });
        if (!searchemail) return res.status(404).json({message:'No user found email.'});
        
        const passwordIsValid = bcrypt.compareSync(req.body.password, searchemail.password);
        if (!passwordIsValid) return res.status(401).send({ message:'No user found password.'});
  
        
         
        
         // return the information including token as JSON
        res.status(200).json({message:'You have successfully logged in', token: service.createToken(searchemail)});
    }catch(e){

        res.status(500).json({message:e.message});
    }

};


module.exports = {
    neWusers,
    loginUser
}