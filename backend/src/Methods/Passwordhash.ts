const bcrypt = require('bcrypt');

// we use Promise beacuse we are using async, which not direct return string value.
const hashpassword = async (Password: string): Promise<string> => {
    
    return await bcrypt.hash(Password, 10);
}

const ComparePassword = async (Password: string,HashedPassword:string): Promise<boolean> =>{
    var compare = await bcrypt.compare(Password,HashedPassword);
    if (compare) {
        return true;
    }else{
        return false;
    }
}

export {hashpassword,ComparePassword};