import Pool from "../Pool/Pool";
import Tokens from "./TokensEnum";

export default interface IToken {
    name?: Tokens,
    hashrateGlobalGhPerSec: number,
    blockPerHourAvg: number,
    blockReward: number,
    pools?: Pool[],
    bestPool?: Pool,

};