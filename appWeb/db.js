const mongoose = require('mongoose');
const {  db } = require('./keys');

mongoose.connect( db.URI, {
  useNewUrlParser: true    
})
  .then(db => console.log('db is connected'))
  .catch(err => console.log(err));