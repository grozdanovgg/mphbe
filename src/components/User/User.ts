import IUser from "./IUser";

class User implements IUser {
    name: string;
    email: string;
    timePerPoolHopMin: number = 2;
    hopBufferMin: number = 10;
    lossPerHop: number;
    lossPerHour: number;
    checkIntervalSec: number = 60;


    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}

export default User;