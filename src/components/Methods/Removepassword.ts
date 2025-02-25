import axios from "axios";


async function RemovePass(Userid:string,Passid:string) {
    var result:boolean = false;
    await axios.post(import.meta.env.VITE_REMOVE_PASS,{Userid:Userid,Passid:Passid})

    .then((res)=>{
        result = true
    })

    .catch((err)=>{
        console.log(err);
        result = false
    })

    return result;
}


export {RemovePass}