import Pool from "../../components/Pool/Pool";
import * as request from 'request-promise-native';
import { CONSTANTS } from "../../config/constants";
import IToken from "./IToken";

class Token implements IToken {

    name: string;
    hashrateGlobalGhPerSec: number = 0;
    blockPerHourAvg: number;
    blockReward: number;
    bestPool: Pool;
    infoUpdatedAt: number;

    constructor(
        name: string,
        hashrateGlobalGhPerSec?: number,
        blockPerHourAvg?: number
    ) {
        this.name = name;
        this.hashrateGlobalGhPerSec = hashrateGlobalGhPerSec;
        this.blockPerHourAvg = blockPerHourAvg;
    }

    async updateInfo(): Promise<void> {

        try {
            // converting to GH/s
            this.hashrateGlobalGhPerSec = await request(CONSTANTS.RAVENCOIN_GLOBAL_HR_API_URL);
            this.hashrateGlobalGhPerSec = +this.hashrateGlobalGhPerSec / 1000000000;
            this.blockPerHourAvg = CONSTANTS.RAVENCOIN_BLOCKS_PER_HOUR;
            this.blockReward = CONSTANTS.RAVENCOIN_BLOCK_REWARD;
            this.infoUpdatedAt = Date.now();
        } catch (error) {
            console.log(error);
        }
    }
}

export default Token;
