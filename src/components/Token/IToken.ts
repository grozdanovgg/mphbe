import Pool from "../Pool/Pool";

export default interface IToken {
    name?: string,
    hashrateGlobalGhPerSec: number,
    blockPerHourAvg: number,
    blockReward: number,
    pools?: Pool[],
    bestPool?: Pool,
    infoUpdatedAt?: number;

};