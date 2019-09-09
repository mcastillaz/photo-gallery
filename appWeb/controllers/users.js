const User = require('../models/User');

const neWusers = async function (req, res) {
    try {
        const user = new User();

        const params = req.body;
        user.name = params.name;
        user.email = params.email;
        user.password = params.password;

        await user.save();

        return res.status(200).json(user);
    }
    catch (e) {
        return res.status(500).json({message:e.message});
    }
};

const AutenticationUser = function(req, res) {
      
    

}





module.exports = {
    neWusers
}