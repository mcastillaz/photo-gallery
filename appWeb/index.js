const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4')
const { format } = require('timeago.js');
const bodyParser = require('body-parser');

//Initializations
const app = express();
require('./db');
//require('./services/passport');
const API = require('./routes/api');

//Settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'ejs');//
app.set('views', path.join(__dirname,'views')); 

//Middlewares
app.use(morgan('dev'));


const storage_name = multer.diskStorage({
   destination: path.join(__dirname, 'public/photos/uploads'),
   filename: (req, file, cb, filename) => {
       cb(null, uuid() + path.extname(file.originalname));
   },
   fileFilter: function (req, file, cb) {
      var filetypes = /jpeg|jpg|png|gif/;
      var mimetype = filetypes.test(file.mimetype);
      var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
      if (mimetype && extname) {
          return cb(null, true);
      }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
     }
   

});

app.use(multer({storage: storage_name}).single('photo'));// Subir las imagenes una a la vez(single) (decirle atarvez de que imput se va a subir la foto (photo)) - toda esta informacion se le envia a Uler ataraves de un objeto
app.use(session({
    secret: 'secret',  
    resave: true,
    saveUninitialized: true
  }));

app.use(flash());
//app.use(passport.initialize());
//app.use(passport.session());

//Global Variables
app.use((req, res, next) => {
  app.locals.format = format;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');//Almacena los mensajes flash
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });


//Routes
app.use(require('./routes/index'));
app.use(require('./routes/photo'));
app.use(require('./routes/users'));
app.use(API);

//static files

app.use(express.static(path.join(__dirname, 'public')));

//Star the server

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
