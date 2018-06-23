import { APP_CONFIG } from './../../config/app.config';
import Token from "./Token";
import Pool from '../Pool/Pool';
import DB from '../../database/repository';

const tokens: Token[] = [];

export async function getTokenInfo(tokenName: string): Promise<Token> {
    const token: Token = new Token(tokenName);

    const tokenKnown: number = tokens.findIndex((token) => {
        return token.name === tokenName;
    })

    if (tokenKnown !== -1 &&
        Date.now() - tokens[tokenKnown].infoUpdatedAt < APP_CONFIG.tokenDataRefreshRate) {

        return tokens[tokenKnown];
    }


    try {
        await token.updateInfo();
        // converting to GH/s
        // token.hashrateGlobalGhPerSec = await request(CONSTANTS.RAVENCOIN_GLOBAL_HR_API_URL);
        // token.hashrateGlobalGhPerSec = +token.hashrateGlobalGhPerSec / 1000000000;
        // token.blockPerHourAvg = CONSTANTS.RAVENCOIN_BLOCKS_PER_HOUR;
        // token.blockReward = CONSTANTS.RAVENCOIN_BLOCK_REWARD;
        // token.infoUpdatedAt = Date.now();

        tokens.push(token);

        return token;
    } catch (error) {
        console.log(error);
    }
}

export async function getBestPool(pools: Pool[]): Promise<Pool> {

    for (let pool of pools) {
        try {
            await pool.crawl();

        } catch (error) {
            console.log(error);
        }
    }

    return pools[0];
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

export function getTokenPoolsFromDB(tokenName: string): Pool[] {
    DB.
}
