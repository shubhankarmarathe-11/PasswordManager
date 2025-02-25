const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
import {StatusCodes} from './AddAccount'

dotenv.config();

async function generateAccessToken(Userid:string) {
    var token_generate = await jwt.sign({Userid:Userid}, process.env.JWTSECRETKEY, { expiresIn: '7d' });
    return token_generate;
}

async function VerifyToken(Token:string){
    try{
        if (Token!="") {
            return await jwt.verify(Token,process.env.JWTSECRETKEY);
        }else{
            return StatusCodes.NotFound;
        }
    }catch{
        return StatusCodes.NotFound;
    }
}


export {generateAccessToken,VerifyToken};