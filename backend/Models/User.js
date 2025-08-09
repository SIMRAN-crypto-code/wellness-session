var mongoose=require('mongoose');
let schema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now
    }

});
let usermodel=mongoose.model('user',schema);
module.exports=usermodel;