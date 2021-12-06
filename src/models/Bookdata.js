//Accessing mongoose package
const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb+srv://userone:userone@library.t4oxr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//Schema definition
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title  : String,
    author : String,
    genre  : String,
    image  : String
})

//Model creation    
const Bookdata = mongoose.model('bookdata',BookSchema);

module.exports = Bookdata;