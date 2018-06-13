import IPool from "../interfaces/IPool";
import PoolServise from "../services/PoolService";

export default class Pool extends PoolServise implements IPool {
    name: string;
    blocksUrl: string;
    lastBlockHtmlSelector: string;
    isPoolBase: boolean;
    isPoolActivlyMining: boolean;
    timeFromLastBlockMin: number;
    roundProgress: number;
    hopIndexTeoretical: number;
    hopIndexReal: number;
    hopIndexRealBuffered: number;
    hashrateGhPerSec: number;
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
        super();
        this.name = name;
        this.blocksUrl = blocksUrl;
        this.lastBlockHtmlSelector = lastBlockHtmlSelector;
        this.isPoolBase = isPoolBase || false;
        this.isPoolActivlyMining = false;
    }

    public initPoolData(): void {
        super.getlastBlockNumberFound(this.blocksUrl, this.lastBlockHtmlSelector);
    }
}