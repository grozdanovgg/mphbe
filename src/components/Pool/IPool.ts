
export default interface IPool {
    name?: string,
    blocksUrl?: string,
    tokenName?: string,
    tokenUrl?: string,
    isPoolBase?: boolean,
    isPoolActivlyMining?: boolean,
    timeFromLastBlockMin?: number,
    roundProgress?: number,
    // hopIndexTeoretical: number,
    hopIndexReal?: number,
    hopIndexRealBuffered?: number,
    hashrateGhPerSec?: number,
    blockHtmlSelector?: string,
    hashrateHtmlSelector?: string,
    blocNumber?: number;
    blockAvgTimeMin?: number,
    blockTimeHour?: number,
    blockTimeDay?: number,
    blockRewardHour?: number,
    blockRewardDay?: number,
    blockLastNumber?: number,
    tokenGlobalHashrateGhPerSec?: number,
    tokenBlocksPerHour?: number,

};
