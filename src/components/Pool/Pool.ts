import IPool from "./IPool";
import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';
import Token from '../Token/Token';
import Tokens from "../Token/TokensEnum";
import IToken from "../Token/IToken";

export default class Pool implements IPool {
    name: string;
    blocksUrl: string;
    tokenUrl: string;
    isPoolBase: boolean;
    isPoolActivlyMining: boolean;
    timeFromLastBlockMin: number = 0;
    roundProgress: number;
    // hopIndexTeoretical: number;
    hopIndexReal: number;
    hopIndexRealBuffered: number;
    hashrateGhPerSec: number;
    blockHtmlSelector: string;
    hashrateHtmlSelector: string;
    blocNumber: number;
    blockTimeMin: number;
    blockTimeHour: number;
    blockTimeDay: number;
    blockRewardHour: number;
    blockRewardDay: number;
    blockLastNumber: number;
    tokenGlobalHashrateGhPerSec: number;
    tokenBlocksPerHour: number;
    poolWorkerInterval: NodeJS.Timer;

    constructor(
        name: string,
        blocksUrl: string,
        tokenUrl: string,
        blockHtmlSelector: string,
        hashrateHtmlSelector: string,
        isPoolBase: boolean,
        tokenGlobalHashrateGhPerSec: number,
        tokenBlocksPerHour: number,

    ) {
        this.name = name;
        this.blocksUrl = blocksUrl;
        this.tokenUrl = tokenUrl;
        this.blockHtmlSelector = blockHtmlSelector;
        this.hashrateHtmlSelector = hashrateHtmlSelector;
        this.isPoolBase = isPoolBase || false;
        this.isPoolActivlyMining = false;
        this.tokenGlobalHashrateGhPerSec = tokenGlobalHashrateGhPerSec;
        this.tokenBlocksPerHour = tokenBlocksPerHour;

    }

    crawl(): Promise<void> {
        const promises: Promise<void>[] = [
            this.crawlPoolBlocks(),
            this.crawlPoolToken()
        ];

        return Promise.all(promises)
            .then((result) => {
                console.log(result)
                // this.getHopIndex();
            }).catch((err) => {
                console.log(err);
            });
    }

    // public startPoolWorker(): void {
    //     this.poolWorkerInterval = setInterval(() => {

    //         const promises: Promise<void>[] = [
    //             this.crawlPoolBlocks(),
    //             this.crawlPoolToken()
    //         ];

    //         Promise.all(promises)
    //             .then((result) => {
    //                 console.log(result)
    //                 // this.getHopIndex();
    //             }).catch((err) => {
    //                 console.log(err);
    //             });

    //     }, APP_CONFIG.poolDataRefreshRate)
    // }

    // public stopPoolWorker(): void {
    //     clearInterval(this.poolWorkerInterval);
    // }

    // public getHopIndex(): number {
    //     this.blockTimeMin = this.getAverageBlockTimeMin();

    // }



    // Private methods:



    private getAverageBlockTimeMin(): number {
        const averageBlockTime: number =
            (this.tokenGlobalHashrateGhPerSec / this.hashrateGhPerSec)
            * (this.tokenBlocksPerHour / 60);

        return averageBlockTime;
    }

    public async crawlPoolBlocks(): Promise<void> {
        await request(this.blocksUrl)
            .then(async (htmlString: string) => {
                const $: CheerioStatic = cheerio.load(htmlString);

                const blockCurrentNumber: number = +$(this.blockHtmlSelector).first().text().trim();

                if (blockCurrentNumber > this.blockLastNumber) {
                    this.blockLastNumber = blockCurrentNumber;

                    let block: { time: string };
                    let blockHash: string;
                    let blockTime: number | string;

                    try {
                        blockHash =
                            await request(`http://raven-blockchain.info/api/getblockhash?index=${this.blockLastNumber}`)
                        block = await request(`http://raven-blockchain.info/api/getblock?hash=${blockHash}`);
                        blockTime = +block.time;
                        this.timeFromLastBlockMin = (Date.now() / 1000 - blockTime) / (60 * 60);

                        this.blockTimeMin = this.getAverageBlockTimeMin();
                        this.roundProgress = this.timeFromLastBlockMin / this.blockTimeMin;
                        this.hopIndexReal =
                            (this.timeFromLastBlockMin + 2) / this.blockTimeMin;
                        this.hopIndexRealBuffered =
                            (this.timeFromLastBlockMin + 2 + 10) / this.blockTimeMin;
                    } catch (error) {
                        console.log(error);
                    }

                    // TODO Emit event - Found new block!
                }

            }).catch((err) => {
                console.log(err);

            });
    }

    private async crawlPoolToken(): Promise<void> {
        await request(this.tokenUrl)
            .then((htmlString: string) => {
                const $: CheerioStatic = cheerio.load(htmlString);

                this.hashrateGhPerSec = +$(this.hashrateHtmlSelector)
                    .first()
                    .text()
                    .trim()
                    .split(' ')[0];

            }).catch((err) => {
                console.log(err);

            });
    }

    // public getHopIndex(): Promise<boolean> {
    //     return this.getlastFoundBlockNumber()
    //         .then((lastBlockNumber) => {
    //             return this.isNewBlockFound(lastBlockNumber);
    //         })
    //         .then((isNewBlockFound: boolean) => {
    //             return isNewBlockFound;
    //             // TODO Implement functionality
    //         }).catch((err) => {
    //             console.log(err);

    //             return false;
    //         });
    // }

    // public async getlastFoundBlockNumber(): Promise<number> {
    //     return await request(this.blocksUrl)
    //         .then((htmlString: string): number => {
    //             const ch: CheerioStatic = cheerio.load(htmlString);

    //             // return +ch('.table tbody:nth-child(1) td a').first().text().trim();
    //             return +ch(this.blockHtmlSelector).first().text().trim();

    //             // return document.evaluate()
    //         }).catch((err) => {
    //             console.log(err);

    //             return 0;
    //         });
    // }

    // private isNewBlockFound(lastBlockNumber: number): boolean {
    //     if (this.blocNumber === 0 && lastBlockNumber) {
    //         this.blocNumber = lastBlockNumber;
    //     }

    //     if (this.blocNumber < lastBlockNumber) {
    //         return true;
    //     }

    //     return false;
    // }
}

