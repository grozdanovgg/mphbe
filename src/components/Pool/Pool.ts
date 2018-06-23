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
    blockTimeMin: number = 0;
    blockTimeHour: number = 0;
    blockTimeDay: number = 0;
    blockRewardHour: number = 0;
    blockRewardDay: number = 0;
    blockLastNumber: number = 0;

    constructor(
        name: string,
        tokenName: string,
        blocksUrl: string,
        tokenUrl: string,
        blockHtmlSelector: string,
        hashrateHtmlSelector: string,
        isPoolBase: boolean

    ) {
        this.name = name;
        this.blocksUrl = blocksUrl;
        this.tokenName = tokenName;
        this.tokenUrl = tokenUrl;
        this.blockHtmlSelector = blockHtmlSelector;
        this.hashrateHtmlSelector = hashrateHtmlSelector;
        this.isPoolBase = isPoolBase || false;
        this.isPoolActivlyMining = false;

    }

    async crawl(): Promise<void> {
        try {
            const poolBlocksDom: CheerioStatic = await this.getPoolBlocksDom();
            const blockCurrentNumber: number = +poolBlocksDom(this.blockHtmlSelector).first().text().trim();

            if (blockCurrentNumber > this.blockLastNumber) {

                let block: { time: string };
                let blockHash: string;
                let blockTime: number | string;

                const poolTokenDom: CheerioStatic = await this.getTokenBlocksDom();
                blockHash =
                    await request(`http://raven-blockchain.info/api/getblockhash?index=${this.blockLastNumber}`)
                block = JSON.parse(await request(`http://raven-blockchain.info/api/getblock?hash=${blockHash}`));

                this.blockLastNumber = blockCurrentNumber;

                // TODO Handle also mh/s and others
                this.hashrateGhPerSec = +poolTokenDom(this.hashrateHtmlSelector)
                    .first()
                    .text()
                    .trim()
                    .split('Gh')[0].trim()
                    .split('gH')[0].trim()
                    .split('GH')[0].trim()
                    .split('gh')[0].trim()
                    .split(' ')[0].trim();
                blockTime = +block.time;
                this.timeFromLastBlockMin = (Date.now() / 1000 - blockTime) / 60;

                const tokenInfo: Token = await TokenService.getTokenInfo(this.tokenName);

                this.blockTimeMin = TokenService.getAverageBlockTimeMin(
                    tokenInfo.hashrateGlobalGhPerSec,
                    tokenInfo.blockPerHourAvg,
                    this.hashrateGhPerSec)

                this.roundProgress = this.timeFromLastBlockMin / this.blockTimeMin;
                this.hopIndexReal =
                    (this.timeFromLastBlockMin + 2) / this.blockTimeMin;
                this.hopIndexRealBuffered =
                    (this.timeFromLastBlockMin + 2 + 10) / this.blockTimeMin;
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    private async getPoolBlocksDom(): Promise<CheerioStatic> {
        try {
            const htmlString: string = await request(this.blocksUrl);

            return cheerio.load(htmlString);
        } catch (error) {
            console.log(error);
        }
    }

    private async getTokenBlocksDom(): Promise<CheerioStatic> {
        try {
            const htmlString: string = await request(this.tokenUrl);

            return cheerio.load(htmlString);
        } catch (error) {
            console.log(error);
        }
    }
}

