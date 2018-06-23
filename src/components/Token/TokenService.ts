import { APP_CONFIG } from './../../config/app.config';
import Token from "./Token";
import Pool from '../Pool/Pool';

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

        tokens.push(token);

        return token;
    } catch (error) {
        console.log(error);
    }
}

export async function calcBestPool(pools: Pool[]): Promise<Pool> {

    try {
        // TODO crawl all ools
        await pools[0].crawl()


        // TODO return only the best pool
        return pools[0];

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
