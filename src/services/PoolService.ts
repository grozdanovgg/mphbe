import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';

class PoolServise {


    blocksUrl: string;
    lastBlockHtmlSelector: string;
    lastBlockNumber: number = 0;

    constructor(blocksUrl: string, lastBlockHtmlSelector: string) {
        this.blocksUrl = blocksUrl;
        this.lastBlockHtmlSelector = lastBlockHtmlSelector;
    }

    protected async getPoolFreshData(): void {


    }

    protected getHopStatus(): Promise<boolean> {
        return this.getlastFoundBlockNumber()
            .then((lastBlockNumber) => {
                return this.isNewBlockFound(lastBlockNumber);
            })
            .then((isNewBlockFound: boolean) => {
                return isNewBlockFound;
                // TODO Implement functionality
            }).catch((err) => {
                console.log(err);

                return false;
            });
    }

    protected async getlastFoundBlockNumber(): Promise<number> {
        return await request(this.blocksUrl)
            .then((htmlString: string): number => {
                const ch: CheerioStatic = cheerio.load(htmlString);

                // return +ch('.table tbody:nth-child(1) td a').first().text().trim();
                return +ch(this.lastBlockHtmlSelector).first().text().trim();

                // return document.evaluate()
            }).catch((err) => {
                console.log(err);

                return 0;
            });
    }

    private isNewBlockFound(lastBlockNumber: number): boolean {
        if (this.lastBlockNumber === 0 && lastBlockNumber) {
            this.lastBlockNumber = lastBlockNumber;
        }

        if (this.lastBlockNumber < lastBlockNumber) {
            return true;
        }

        return false;
    }

}

export default PoolServise;
