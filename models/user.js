const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({

    id :{
        type  : Number,
        required : true
    } ,    
    username :{
      type  : String,
      required : true
    } ,
    password :{
        type  : String,
        required : true
    } ,
    firstName :{
        type  : String,
        required : true
    } ,
    lastName :{
        type  : String,
        required : true
    } ,
    age :{
        type  : Number,
        required : true
    } , 
    height :{
        type  : Number,
        required : true
    } ,
    weight :{
        type  : Number,
        required : true
    } ,
    breakfast :{
        type  : String,
        required : true
    } ,
    lunch :{
        type  : String,
        required : true
    } ,
    dinner :{
        type  : String,
        required : true
    } ,
    date :{
        type : Date,
        default : Date.now
    }
});
const User= mongoose.model('User',UserSchema);

module.exports = User;