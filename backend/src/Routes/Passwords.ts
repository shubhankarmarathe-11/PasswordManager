import express from 'express';
import { StatusCodes } from '../Methods/AddAccount';
import {AddPassword,RemovePassword,Retrive,Passinput} from '../Methods/Crudmethods';

const StorePassRoute = express.Router();





StorePassRoute.post('/AddPasswords', async (req, res) => {
    var { Userid, Website, Username, Password }: Passinput = req.body;

    var Addnewpass = await AddPassword({ Userid, Website, Username, Password });

    if (Addnewpass == StatusCodes.Accepted) {
        res.status(StatusCodes.Success).send('Password Added Successfull ...');
    } else {
        res.status(StatusCodes.TryAgain).send('Please Try Again ...')
    }

});


StorePassRoute.post('/RemovePasswords', async (req,res)=>{
    var Userid:string = req.body.Userid;
    var Passid:string  = req.body.Passid;

    var Removepass = await RemovePassword(Userid, Passid );

    if (Removepass == StatusCodes.Accepted) {
        res.status(StatusCodes.Success).send('Password Removed Successfull ...');
    } else {
        res.status(StatusCodes.TryAgain).send('Please Try Again ...');
    }
})


StorePassRoute.post('/RetriveData', async (req,res)=>{
    var Userid:string = req.body.Userid;
    var findUser = await Retrive(Userid);

    if(findUser != StatusCodes.TryAgain){
        res.status(StatusCodes.Success).send(findUser)
    }   
    else{
        res.status(StatusCodes.TryAgain).send('Please Try Again ...');
    }
})

export { StorePassRoute }