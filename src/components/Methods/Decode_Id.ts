

import axios from "axios";



async function DecodeUserid() {
    var Userid = await localStorage.getItem('Userid');

    var result: any;
    await axios.post(import.meta.env.VITE_IS_VALID, { Token: Userid })

        .then((res) => {
            result = res.data.Userid;
        })

        .catch((err) => {
            console.log(err);

        })

    return result;
}


async function decodeJWT(WebsiteCredentials: any) {

    var result:DecodedData | boolean = false;

    await axios.post(import.meta.env.VITE_IS_VALID,{Token:WebsiteCredentials})

    .then((res)=>{
        result = res.data;
    })

    .catch((err)=>{

    })

    return result
}

type CombinedData = {
    _id: string;
    Userid: string;
    WebsiteCredentials: boolean |string | DecodedData;
    __v: number;
}

type DecodedData = {
    Website: string;
    Username: string;
    Password: string;
    iat: number;
}

async function DecodeData() {
    var Userid = await DecodeUserid();
    var result: any;
    await axios.post(import.meta.env.VITE_RETRIVE_DATA, { Userid: Userid })


        .then(async (res) => {
            result = res.data;

            // Reconstruct the array
            result.map(async(i:CombinedData)=>{
                i.WebsiteCredentials = await decodeJWT(i.WebsiteCredentials);
            })
            // console.log(result);
            
        })

        .catch((err) => {
            result = false
            console.log(err);

        })

    return result;
}

export { DecodeData, DecodeUserid }