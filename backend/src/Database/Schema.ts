const mongoose = require('mongoose');

const UserSchema:{} = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true
    },
    MobileNumber:{
        type:String,
        required:true
    },
    EmailId:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    },
    StoredWebPasswords:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserPasswords",
        }
    ]
})


const AddUser = mongoose.model('AddedUser',UserSchema);

export {AddUser}