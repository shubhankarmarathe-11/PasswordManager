const mongoose = require('mongoose');

const PasswordsSchema:{} = new mongoose.Schema({
    Userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AddedUser"
    },
    WebsiteCredentials :{
        type:String,
        required:true
    }    
})


const AddPasswords = mongoose.model('UserPasswords',PasswordsSchema);

export {AddPasswords}