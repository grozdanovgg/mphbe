import Pool from "../../components/Pool/PoolModel";
import Tokens from "../Token/TokensEnum";
import * as request from 'request-promise-native';
import { CONSTANTS } from "../../config/constants";
import { APP_CONFIG } from "../../config/app.config";


let bestPool: Pool;
let hopWorkerInterval: NodeJS.Timer;
export let tokenGlobalHashrateGhPerSec: number = 0;

export function startHopWorker(token: Tokens): void {
    hopWorkerInterval = setInterval(() => {
        getTokenGlobalHashrate(token);
        getTokenBlocksPerHour(token);
        getTokenBlockReward(token);

    }, APP_CONFIG.tokenDataRefreshRate)
}

export function stopHopWorker(): void {
    clearInterval(hopWorkerInterval);
}

// TODO
// export function getBestPool(pools: Pool[]): Pool {
//     // emmit event when changed...
//     return pools[0];
// };


// Private methods
function getTokenGlobalHashrate(token: Tokens): void {
    request(CONSTANTS.RAVENCOIN_GLOBAL_HR_API_URL)
        .then((result) => {
            console.log(+result)
            tokenGlobalHashrateGhPerSec = +result / 1000000000; // convert to GH/s
        }).catch((err) => {
            console.log(err);
        });
}

export function getTokenBlocksPerHour(token: Tokens): number {
    // TODO
    return CONSTANTS.RAVENCOIN_TOKENS_PER_HOUR;
}

function getTokenBlockReward(token: Tokens): number {

    // TODO
    return CONSTANTS.RAVENCOIN_BLOCK_REWARD;
}
