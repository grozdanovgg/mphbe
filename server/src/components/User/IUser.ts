export default interface IUser {
    name: string,
    email: string,
    timePerPoolHopMin?: number,
    hopBufferMin?: number,
    lossPerHop?: number,
    lossPerHour?: number,
    checkIntervalSec?: number,
};