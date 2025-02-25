import express from 'express'
import {StatusCodes} from '../Methods/AddAccount'
import {VerifyToken} from '../Methods/Jsontoken'


const CheckRoute = express.Router();


CheckRoute.post('/validtoken', async(req,res)=>{
    var Token:string = req.body.Token;

    var verifyToken:string | number = await VerifyToken(Token);

    if(verifyToken!=StatusCodes.NotFound){
        res.status(StatusCodes.Success).send(verifyToken);
    }else{
        res.status(StatusCodes.TryAgain).send("Token Expired Please LogIn again ...");
    }
    
})

export {CheckRoute};