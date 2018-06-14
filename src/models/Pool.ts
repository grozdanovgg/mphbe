import IPool from "../interfaces/IPool";
import PoolServise from "../services/PoolService";

export default class Pool extends PoolServise implements IPool {
    name: string;
    blocksUrl: string;
    isPoolBase: boolean;
    isPoolActivlyMining: boolean;
    timeFromLastBlockMin: number;
    roundProgress: number;
    hopIndexTeoretical: number;
    hopIndexReal: number;
    hopIndexRealBuffered: number;
    hashrateGhPerSec: number;
    blockHtmlSelector: string;
    blocNumber: string;
    blockTimeMin: number;
    blockTimeHour: number;
    blockTimeDay: number;
    blockRewardHour: number;
    blockRewardDay: number;
    blockLastNumber: number;

    constructor(
        name: string,
        blocksUrl: string,
        lastBlockHtmlSelector: string,
        isPoolBase: boolean

    ) {
        super(blocksUrl, lastBlockHtmlSelector);
        this.name = name;
        this.blocksUrl = blocksUrl;
        this.blockHtmlSelector = lastBlockHtmlSelector;
        this.isPoolBase = isPoolBase || false;
        this.isPoolActivlyMining = false;
    }
}

