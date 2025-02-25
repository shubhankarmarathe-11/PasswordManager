import {StatusCodes} from './AddAccount';
import {AddUser} from '../Database/Schema';
import {ComparePassword} from './Passwordhash';
import {generateAccessToken} from './Jsontoken'

type UserLogin = {
    Username:string,
    Password:string
}

class CheckLogin {
    private Username:string;
    private Password: string;
    private Check:any;


    constructor({Username,Password}:UserLogin){
        this.Username = Username;
        this.Password = Password;
    }

    async CheckUserEmail():Promise<number> {
        try{
            this.Check = await AddUser.findOne({EmailId:this.Username});
            if (this.Check != null) {
                return StatusCodes.Accepted
            }else{
                return StatusCodes.NotFound
            }
        }catch{
            return StatusCodes.TryAgain
        }
    }

    async CheckUsername():Promise<number> {
        try{
            if (this.Check==null) {
                
                this.Check = await AddUser.findOne({Username:this.Username});
                
                if (this.Check != null) {
                    return StatusCodes.Accepted
                }else{
                    return StatusCodes.NotFound
                }
            }else{
                return StatusCodes.NotFound
            }
        }catch{
            return StatusCodes.TryAgain
        }
    }



    async CheckPassword():Promise<number> {

        try{
            if (this.Check != null) {
                
                var compare = await ComparePassword(this.Password,this.Check.Password);
                
                if (compare) {
                    return StatusCodes.Success;
                }else{
                    return StatusCodes.TryAgain;
                }
            }else{
                return StatusCodes.TryAgain;
            }
        }catch{
            return StatusCodes.TryAgain
        }
    }

    async Generatejwt():Promise<string>{

        var generatetoken:string = await generateAccessToken(this.Check._id);
        return generatetoken;

    }

}



export {UserLogin,CheckLogin};