
type CheckInput={
    Email:string,
    Password:string,
    Number:number
}

class CheckInputs{
    private Email:string;
    private Password:string;
    private Number:number;

    constructor({Email,Password,Number}:CheckInput){
        this.Email = Email;
        this.Password = Password;
        this.Number = Number;
    }

    CheckEmail(){
        if (this.Email.includes('@gmail.com')) {
            return true
        }
        else{
            return false
        }
    }

    CheckPassword(){
        if (this.Password.length >= 8) {
            return true
        }
        else{
            return false
        }
    }

    CheckMob(){
        var num:string = this.Number.toString();
        if (num.length >=10 && num.length<11) {
            return true
        }
        else{
            return false
        }
    }
}


export {CheckInput,CheckInputs}