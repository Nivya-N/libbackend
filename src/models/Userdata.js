//Accessing mongoose package
const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb+srv://userone:userone@library.t4oxr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//Schema definition
const Schema = mongoose.Schema;
const UserSchema = new Schema({
   name  : String,
    email: String,
    mobile: String,
    password  : String
})

//Model creation    
const Userdata = mongoose.model('Userdata',UserSchema);

module.exports = Userdata;