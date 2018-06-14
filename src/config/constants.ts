interface IConstants {
    RAVENCOIN_GLOBAL_HR_API_URL?: string;
    RAVENCOIN_TOKENS_PER_HOUR: number;
    RAVENCOIN_BLOCK_REWARD: number;

}


export const CONSTANTS: IConstants = {
    RAVENCOIN_GLOBAL_HR_API_URL: 'http://raven-blockchain.info/api/getnetworkhashps',
    RAVENCOIN_TOKENS_PER_HOUR: 60,
    RAVENCOIN_BLOCK_REWARD: 5000,
}
