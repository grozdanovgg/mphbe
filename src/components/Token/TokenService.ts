import { APP_CONFIG } from '../../config/app.config';
import Token from "./Token";
import Pool from '../Pool/Pool';

const tokens: Token[] = [];

export async function getTokenInfo(tokenName: string): Promise<Token> {
    const token: Token = new Token(tokenName);

    const tokenKnown: number = tokens.findIndex((token) => {
        return token.name === tokenName;
    })

    if (tokenKnown !== -1 &&
        tokens[tokenKnown] &&
        Date.now() - tokens[tokenKnown].infoUpdatedAt > APP_CONFIG.tokenDataRefreshRate) {

        return tokens[tokenKnown];
    }


    try {
        await token.updateInfo();

        tokens.push(token);

        return token;
    } catch (error) {
        console.log(error);
    }
}

export async function chooseBestPool(pools: Pool[], token: Token): Promise<Pool> {

    try {
        // await crawlPools(pools);

        // TODO return only the best pool
        console.log(token);
        console.log(pools);

        const tokenInfo: Token = await getTokenInfo(this.tokenName);
        let bestPool: Pool;
        for (const pool of pools) {
            pool.calcHopIndex(tokenInfo);

            if (!bestPool) {
                bestPool = pool;
            }

            if (pool.hopIndexRealBuffered < bestPool.hopIndexRealBuffered) {
                bestPool = pool;
            }
        }


        return bestPool;

    } catch (error) {
        console.log(error);

        return error;
    }
}



export function getAverageBlockTimeMin(
    tokenGlobalHashrateGhPerSec: number,
    tokenBlocksPerHour: number,
    poolHashrateGhPerSec: number): number {

    const averageBlockTime: number =
        (tokenGlobalHashrateGhPerSec / poolHashrateGhPerSec)
        * (tokenBlocksPerHour / 60);

    return averageBlockTime;
}

async function crawlPools(pools: Pool[]): Promise<void> {
    try {
        // const promises: any = [];
        for (let pool of pools) {
            // promises.push(pool.crawl());
            await pool.crawl();
        }
        // await Promise.all(promises);
    } catch (error) {
        console.log(error);
    }
}
