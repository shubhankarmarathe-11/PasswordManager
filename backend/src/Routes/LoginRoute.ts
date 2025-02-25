import express from 'express';
import {StatusCodes} from '../Methods/AddAccount'
import {CheckLogin,UserLogin} from '../Methods/LoginCheck'

const Login = express.Router();


Login.post("/Login", async(req, res) => {
  
  var {Username,Password} :UserLogin = req.body;

  var CheckAuth = new CheckLogin({Username,Password});


  var CheckUserEmail:number = await CheckAuth.CheckUserEmail();
  var CheckUsername:number = await CheckAuth.CheckUsername();
  var CheckPassword:number = await CheckAuth.CheckPassword();

  
  if ((CheckUserEmail==StatusCodes.Accepted || CheckUsername == StatusCodes.Accepted) && CheckPassword == StatusCodes.Success) {

    var generatejwt:string = await CheckAuth.Generatejwt();

    res.status(StatusCodes.Success).send(generatejwt);

  }

  else if(CheckUserEmail==StatusCodes.TryAgain || CheckUsername == StatusCodes.TryAgain){
    res.status(StatusCodes.NotFound).send('User not exist ...');
  }

  else if ((CheckUserEmail==StatusCodes.Accepted || CheckUsername == StatusCodes.Accepted) && CheckPassword == StatusCodes.TryAgain) {
    res.status(StatusCodes.NotFound).send('Invalid Password ...');
  }

  else if((CheckUserEmail==StatusCodes.NotFound || CheckUsername == StatusCodes.NotFound) && CheckPassword == StatusCodes.TryAgain){
    res.status(StatusCodes.NotFound).send('Invalid Username And Password ...');
  }

  else{
    res.status(StatusCodes.TryAgain).send('Please Try Again  ...');
  }

});


export {Login};