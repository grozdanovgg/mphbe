export default interface IUser {
    email: string,
    hashrateGhSec: number,
    timePerPoolHopMin: number,
    hopBufferMin: number,
    lossPerHop: number
    lossPerHour: number,
    checkIntervalSec: number,
};