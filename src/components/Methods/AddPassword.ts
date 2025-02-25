

import axios from "axios";
import {DecodeUserid} from "./Decode_Id"

async function AddNewPassword(Website:string,Username:string,Password:string) {

    var Userid:string = await DecodeUserid();
    var result:boolean = false;

    await axios.post(import.meta.env.VITE_ADD_PASS,{Userid:Userid,Website:Website,Username:Username,Password:Password})

    .then((res)=>{
        result = true
    })

    .catch((err)=>{
        console.log(err);
    })

    
    return result;
}


export {AddNewPassword}