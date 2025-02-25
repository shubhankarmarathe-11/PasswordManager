import express from "express";
import { CreateUser, StatusCodes, User } from '../Methods/AddAccount';
import { hashpassword } from '../Methods/Passwordhash';
import { CheckInputs } from '../Methods/CheckStatements';

const Signup = express.Router();


Signup.post('/Signup', async (req, res) => {
    var { Username, Number, Email, Password }: User = req.body;

    var CheckStatement = new CheckInputs({Email,Number,Password });

    var CheckEmail: boolean = CheckStatement.CheckEmail();
    var CheckMon: boolean = CheckStatement.CheckMob();
    var CheckPass: boolean = CheckStatement.CheckPassword();

    if (CheckEmail == true && CheckMon == true && CheckPass == true) {

        Password = await hashpassword(Password);

        var Createuser = new CreateUser({ Username, Number, Password, Email });

        var checkuser: number  = await Createuser.CheckUser();



        if (checkuser == StatusCodes.NotFound) {
            var createaccount : number|string  = await Createuser.CreateAccount();

            if (createaccount == StatusCodes.TryAgain) {
                res.status(StatusCodes.Conflict).send("User Already Exist ...");
            } else {
                
                res.status(StatusCodes.Success).send(createaccount);
            }
        }
        else {
            res.status(StatusCodes.Conflict).send("User Already Exist ...");
        }

    }

    else if(CheckEmail == false && CheckMon == true && CheckPass == true){
        res.status(StatusCodes.TryAgain).send('Please Use valid Email ...');
    }

    else if(CheckEmail == true && CheckMon == false && CheckPass == true){
        res.status(StatusCodes.TryAgain).send('Please Use valid Mobile Number ...');
    }

    else if(CheckEmail == true && CheckMon == true && CheckPass == false){
        res.status(StatusCodes.TryAgain).send('Password Must include 8 character ...');
    }

    else {
        res.status(StatusCodes.TryAgain).send('Invalid Credientials ...');
    }

})


export { Signup, StatusCodes }

// When you are exporting two things make sure both are export {Signup,StatusCodes} exported like this or make one default and other use as named export