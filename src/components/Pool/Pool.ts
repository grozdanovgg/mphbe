// import horseman from "../../../typings/node-horseman";
import Horseman = require('node-horseman');
import IPool from "./IPool";
import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';
import * as TokenService from '../Token/TokenService';
import Token from "../Token/Token";

export default class Pool implements IPool {
    name: string;
    blocksUrl: string;
    tokenName: string;
    tokenUrl: string;
    isPoolBase: boolean;
    isPoolActivlyMining: boolean;
    timeFromLastBlockMin: number = 0;
    roundProgress: number = 0;
    // hopIndexTeoretical: number;
    hopIndexReal: number = 0;
    hopIndexRealBuffered: number = 0;
    hashrateGhPerSec: number = 0;
    blockHtmlSelector: string;
    hashrateHtmlSelector: string;
    blocNumber: number = 0;
    blockAvgTimeMin: number = 0;
    blockRewardHour: number = 0;
    blockRewardDay: number = 0;
    blockLastNumber: number = 0;

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

    async crawl(): Promise<boolean> {
        try {

            const horseman: Horseman = new Horseman({
                loadImages: false,
                timeout: 15000,
            });
            let blockCurrentNumber: number;
            await horseman
                .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
                .open('https://hash4.life/site/block?id=3336')
                .status()
                .then(function (status: string | number): Promise<never> | void {
                    // if it MAKES it this FAR, then u're good to check the STATUS

                    if (Number(status) != 200) {
                        console.log("Was expecting 200, but got", status);

                        return Promise.reject();
                    }
                })
                .text('#maintable > tbody > tr:nth-child(1) > td:nth-child(4) > a')
                .then((text) => {
                    console.log(text);

                    blockCurrentNumber = +text.trim();
                })
                .close();

            if (blockCurrentNumber > this.blockLastNumber) {
                console.log('in');
                let block: { time: string };
                let blockHash: string;
                let blockTime: number | string;

                blockHash =
                    await request(`http://raven-blockchain.info/api/getblockhash?index=${this.blockLastNumber}`)
                block = JSON.parse(await request(`http://raven-blockchain.info/api/getblock?hash=${blockHash}`));

                this.blockLastNumber = blockCurrentNumber;

                const horseman2: Horseman = new Horseman({
                    loadImages: false,
                    timeout: 15000,
                });

                await horseman2
                    .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
                    .open('https://hash4.life/site/mining')
                    .status()
                    .then(function (status: string): Promise<never> | void {
                        // if it MAKES it this FAR, then u're good to check the STATUS

                        if (Number(status) != 200) {
                            console.log("Was expecting 200, but got", status);

                            return Promise.reject();
                        }
                    })
                    .text('#maintable1 > tbody:nth-child(2) > tr:nth-child(22) > td:nth-child(4)')
                    .then((text) => {
                        // TODO Handle also mh/s and others
                        text = text
                            .trim()
                            .split('Gh')[0].trim()
                            .split('gH')[0].trim()
                            .split('GH')[0].trim()
                            .split('gh')[0].trim()
                            .split(' ')[0].trim();

                        console.log(text);

                        this.hashrateGhPerSec = Number(text);
                        console.log(this.hashrateGhPerSec);

                    })
                    .close();

                blockTime = +block.time;
                this.timeFromLastBlockMin = (Date.now() / 1000 - blockTime) / 60;

                const tokenInfo: Token = await TokenService.getTokenInfo(this.tokenName);

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

            return;
        }
        catch (error) {
            console.log(error);

            return;
        }
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


    private async getPoolBlocksDom(): Promise<CheerioStatic> {
        try {
            const htmlString: string = await request(this.blocksUrl, { timeout: 5000 });

            return cheerio.load(htmlString);
        } catch (error) {
            console.log(error);
        }
    }

    private async getPoolTokenBlocksDom(): Promise<CheerioStatic> {
        try {
            const htmlString: string = await request(this.tokenUrl, { timeout: 5000 });

            return cheerio.load(htmlString);
        } catch (error) {
            console.log(error);
        }
    }
}
