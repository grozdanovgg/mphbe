import Pool from "../../components/Pool/PoolModel";
import Tokens from "../Token/TokensEnum";
import * as request from 'request-promise-native';
import { CONSTANTS } from "../../config/constants";
import { APP_CONFIG } from "../../config/app.config";

class TokenService {
    bestPool: Pool;
    hopWorkerInterval: NodeJS.Timer;
    activePools: Pool[];
    tokenGlobalHashrateGhPerSec: number = 0;

    startHopWorker(token: Tokens): void {

        this.hopWorkerInterval = setInterval(() => {
            this.getTokenGlobalHashrate(token);
            this.getTokenBlocksPerHour(token);
            this.getTokenBlockReward(token);

        }, APP_CONFIG.tokenDataRefreshRate)
    }

    stopHopWorker(): void {
        clearInterval(this.hopWorkerInterval);
    }

    // TODO
    // getBestPool(pools: Pool[]): Pool {
    //     // emmit event when changed...
    //     return pools[0];
    // };

    getTokenGlobalHashrate(token: Tokens): void {

        request(CONSTANTS.RAVENCOIN_GLOBAL_HR_API_URL)
            .then((result) => {
                console.log(+result)
                this.tokenGlobalHashrateGhPerSec = +result / 1000000000; // convert to GH/s
            }).catch((err) => {
                console.log(err);
            });
    }

    getTokenBlocksPerHour(token: Tokens): number {
        // TODO
        return CONSTANTS.RAVENCOIN_TOKENS_PER_HOUR;
    }

    getTokenBlockReward(token: Tokens): number {

        // TODO
        return CONSTANTS.RAVENCOIN_BLOCK_REWARD;
    }
}

export default new TokenService();
