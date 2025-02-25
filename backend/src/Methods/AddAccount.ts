import {AddUser} from '../Database/Schema';
import {generateAccessToken} from './Jsontoken';

enum StatusCodes {
    NotFound = 404,
    Success = 200,
    Accepted = 202,
    BadRequest = 400,
    Conflict = 409,
    TryAgain = 503
}


type User = {
    Username: string,
    Email: string,
    Number: number,
    Password: string,
}

class CreateUser {
    private Username: string;
    private Email: string;
    private Number: number;
    private Password: string;

    constructor({ Username, Number, Email, Password }: User) {
        this.Username = Username;
        this.Number = Number;
        this.Email = Email;
        this.Password = Password;

    }

    async CheckUser() {
        try {
            var CheckUserdb = await AddUser.findOne({ EmailId: this.Email });
            if (CheckUserdb != null) {
                return StatusCodes.Conflict
            }
            else {
                return StatusCodes.NotFound
            }
        } catch {
            return StatusCodes.TryAgain
        }

    }

    async CreateAccount() {
        try {
            var CreateUserdb = await AddUser.create({ Username: this.Username, MobileNumber: this.Number, EmailId: this.Email, Password: this.Password })
            await CreateUserdb.save();

            var generatetoken:string = await generateAccessToken(CreateUserdb._id);

            return generatetoken;
        } catch(err) {
            console.log(err);
            
            return StatusCodes.TryAgain
        }
    }

}

export {CreateUser,StatusCodes,User}