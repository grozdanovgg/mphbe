import IPool from "../interfaces/IPool";
import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';

export default class Pool implements IPool {
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
        isPoolBase?: boolean
    ) {
        this.name = name;
        this.blocksUrl = blocksUrl;
        this.lastBlockHtmlSelector = lastBlockHtmlSelector;
        this.isPoolBase = isPoolBase || false;
        this.isPoolActivlyMining = false;
        this.timeFromLastBlockMin = null;
        this.roundProgress = null;
        this.hopIndexTeoretical = null;
    }


    public getHopStatus(poolUrl: string, lastBlockHtmlSelector: string): Promise<boolean> {

        return this.getlastBlockNumberFound(poolUrl, lastBlockHtmlSelector)
            .then((blockLastNumber) => {
                return this.isNewBlockFound(blockLastNumber);
            })
            .then((isNewBlockFound: boolean) => {
                return isNewBlockFound;
                // TODO Implement functionality
            }).catch((err) => {
                console.log(err);

                return false;
            });

    }
    private isNewBlockFound(blockLastNumber: number): boolean {
        if (this.blockLastNumber === 0 && blockLastNumber) {
            this.blockLastNumber = blockLastNumber;
        }

        if (this.blockLastNumber < blockLastNumber) {
            return true;
        }

        return false;
    }
    private getlastBlockNumberFound(poolUrl: string, selector: string): Promise<number> {
        return request(poolUrl)
            .then((htmlString: string): number => {
                const ch: CheerioStatic = cheerio.load(htmlString);

                // return +ch('.table tbody:nth-child(1) td a').first().text().trim();
                return +ch(selector).first().text().trim();

                // return document.evaluate()
            }).catch((err) => {
                console.log(err);

                return 0;
            });
    }
}