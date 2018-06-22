export default interface IUser {
    email: string,
    timePerPoolHopMin: number,
    hopBufferMin: number,
    lossPerHop: number,
    lossPerHour: number,
    checkIntervalSec: number,
};