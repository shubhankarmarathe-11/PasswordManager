

import axios from "axios";

async function Check_is_Valid(Token:string | null) {
    var result:boolean = false;

    await axios.post(import.meta.env.VITE_IS_VALID,{Token:Token})

    .then((res)=>{
        result = true;
    })

    .catch ((err)=>{
        result = false;
    })

    return result;

}


export {Check_is_Valid}

