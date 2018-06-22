import IUser from "./IUser";

class User implements IUser {
    email: string;
    timePerPoolHopMin: number = 2;
    hopBufferMin: number = 10;
    lossPerHop: number;
    lossPerHour: number;
    checkIntervalSec: number = 60;


    constructor(email: string) {
        this.email = email;
    }
}

export default User;