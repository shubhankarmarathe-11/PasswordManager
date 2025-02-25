import express from 'express'
import {Signup} from './Routes/SignupRoute'
import {Login} from './Routes/LoginRoute'
import {CheckRoute} from './Routes/CheckToken'
import {StorePassRoute} from './Routes/Passwords'

import mongoose from 'mongoose';

const mainRoute = express.Router();


const ConnectDB = async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/PasswordManager");        
        console.log('Connected To DataBase.');
        
    } catch (error) {
        console.log('Not connected to Database');
        
    }
}

ConnectDB();


mainRoute.use(Login);
mainRoute.use(Signup);
mainRoute.use(CheckRoute);
mainRoute.use(StorePassRoute);

module.exports = mainRoute;