import {StatusCodes} from './AddAccount';
import { AddUser } from '../Database/Schema'
import { AddPasswords } from '../Database/PasswordsSchema'


const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


type Passinput = {
    Userid: string,
    Website: string,
    Username: string,
    Password: string
}


async function EncryptPass(Website: string, Username: string, Password: string) {
    try {
        var encrypts: string = await jwt.sign({ Website: Website, Username: Username, Password: Password }, process.env.JWTSECRETKEY);

        return encrypts;
    } catch {
        return StatusCodes.TryAgain;
    }
}

async function AddPassword({ Userid, Website, Username, Password }: Passinput) {

    try {
        var Encryptcred = await EncryptPass(Website, Username, Password);
        if (Encryptcred != StatusCodes.TryAgain) {

            var AddPassword = await AddPasswords.create({ Userid: Userid,WebsiteCredentials:Encryptcred });
            AddPassword.save();

            var Finduser = await AddUser.findByIdAndUpdate(Userid, { $push: { StoredWebPasswords: AddPassword._id } });

            return StatusCodes.Accepted;
        }else{
            return StatusCodes.TryAgain;
        }

    }
    catch {
        return StatusCodes.TryAgain;
    }


}

async function RemovePassword(Userid: string, Passid: string) {
    try {


        var FindPass = await AddPasswords.findById(Passid);
        if (FindPass!=null) {
            var DeletePass = await AddPasswords.findByIdAndDelete(Passid);
            var Finduser = await AddUser.findByIdAndUpdate(Userid,{$pull:{StoredWebPasswords:Passid}});
            return StatusCodes.Accepted

        }else{
            return StatusCodes.TryAgain
        }

    }
    catch {
        return StatusCodes.TryAgain;
    }
}


async function Retrive(Userid: string) {
    try{

        var result = await AddUser.findById(Userid).populate('StoredWebPasswords');
        return result.StoredWebPasswords;
    }catch{
        return StatusCodes.TryAgain
    }
}


export {AddPassword,RemovePassword,Retrive,Passinput}