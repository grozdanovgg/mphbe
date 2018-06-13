export default interface IPool {
    name: string,
    blocksUrl: string,
    lastBlockHtmlSelector: string,
    isPoolBase: boolean,
    isPoolActivlyMining: boolean,
    timeFromLastBlockMin: number,
    poolRoundProgress: number,
    poolHopIndexTeoretical: number,
    poolHopIndexReal: number,
    poolHopIndexRealBuffered: number,
    poolHashrateGhPerSec: number,
    poolBlockTimeMin: number,
    poolBlockTimeHour: number,
    poolBlockTimeDay: number,
    poolBlockRewardHour: number,
    poolBlockRewardDay: number,
    // userRewardPerBlock: number,
    // userRewardPerDay: number,
    // userRewardPerHour: number,
    // userRewardPerMin: number,

};