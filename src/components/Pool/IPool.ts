
export default interface IPool {
    name: string,
    tokenName: string,
    timeFromLastBlockMin?: number,
    hashrateGhPerSec?: number,
    blockAvgTimeMin?: number,
    hopIndexReal?: number,
    hopIndexRealBuffered?: number,

    // isPoolBase?: boolean,
    // isPoolActivlyMining?: boolean,
};
