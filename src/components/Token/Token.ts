import Pool from "../../components/Pool/Pool";
import Tokens from "../Token/TokensEnum";
import * as request from 'request-promise-native';
import { CONSTANTS } from "../../config/constants";
import { APP_CONFIG } from "../../config/app.config";
import IToken from "./IToken";


class Token implements IToken {

    name: Tokens;
    hashrateGlobalGhPerSec: number = 0;
    blockPerHourAvg: number;
    blockReward: number;
    pools: Pool[];
    bestPool: Pool;


    hopWorkerInterval: NodeJS.Timer;

    constructor(name: Tokens) {
        this.name = name;
        this.updateInfo();
    }

    startHopWorker(token: Tokens): void {

        this.hopWorkerInterval = setInterval(() => {
            this.updateInfo();

        }, APP_CONFIG.tokenDataRefreshRate)
    }

    stopHopWorker(): void {
        clearInterval(this.hopWorkerInterval);
    }

    private async updateInfo(): Promise<void> {

        try {
            // converting to GH/s
            this.hashrateGlobalGhPerSec = await +request(CONSTANTS.RAVENCOIN_GLOBAL_HR_API_URL) / 1000000000;
            this.blockPerHourAvg = CONSTANTS.RAVENCOIN_BLOCKS_PER_HOUR;
            this.blockReward = CONSTANTS.RAVENCOIN_BLOCK_REWARD;

        } catch (error) {
            console.log(error);
        }
    }
}

export default Token;
