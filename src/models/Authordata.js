//Accessing mongoose package
const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb+srv://userone:userone@library.t4oxr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//Schema definition
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
   name  : String,
    
    image  : String
})

//Model creation    
const Authordata = mongoose.model('authordata',AuthorSchema);

module.exports = Authordata;