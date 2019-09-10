const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});



router.get('/users/singup', (req, res) => {
    res.render('users/signup');
});



module.exports = router;