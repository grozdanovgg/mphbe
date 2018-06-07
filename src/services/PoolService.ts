import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';
import { SSL_OP_LEGACY_SERVER_CONNECT } from 'constants';

class PoolService {
    lastBlockNumber: number = 0;
    public getHopStatus(poolUrl: string, lastBlockHtmlSelector: string): Promise<boolean> {

        return this.getlastBlockNumberFound(poolUrl, lastBlockHtmlSelector)
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
    private isNewBlockFound(lastBlockNumber: number): boolean {
        if (this.lastBlockNumber === 0 && lastBlockNumber) {
            this.lastBlockNumber = lastBlockNumber;
        }

        if (this.lastBlockNumber < lastBlockNumber) {
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

export default new PoolService();
