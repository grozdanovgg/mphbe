// import horseman from "../../../typings/node-horseman";
import Horseman = require('node-horseman');
import IPool from "./IPool";
import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';
import * as TokenService from '../Token/TokenService';
import Token from "../Token/Token";

export default class Pool implements IPool {
    name: string;
    tokenName: string;
    timeFromLastBlockMin: number = 0;
    roundProgress: number = 0;
    hopIndexReal: number = 0;
    hopIndexRealBuffered: number = 0;
    hashrateGhPerSec: number = 0;
    blockAvgTimeMin: number = 0;
    // isPoolBase: boolean;
    // isPoolActivlyMining: boolean;

    constructor(
        name: string,
        tokenName: string,
        timeFromLastBlockMin: number,
        hashrateGhPerSec: number
    ) {
        this.name = name;
        this.tokenName = tokenName;
        this.timeFromLastBlockMin = timeFromLastBlockMin;
        this.hashrateGhPerSec = hashrateGhPerSec;
    }

    calcHopIndex(tokenInfo: Token): void {

        this.blockAvgTimeMin = TokenService.getAverageBlockTimeMin(
            tokenInfo.hashrateGlobalGhPerSec,
            tokenInfo.blockPerHourAvg,
            this.hashrateGhPerSec)

        this.roundProgress = this.timeFromLastBlockMin / this.blockAvgTimeMin;
        this.hopIndexReal =
            (this.timeFromLastBlockMin + 2) / this.blockAvgTimeMin;
        this.hopIndexRealBuffered =
            (this.timeFromLastBlockMin + 2 + 10) / this.blockAvgTimeMin;
    }
}
