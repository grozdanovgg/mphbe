interface IAppConfig {

    //taken from average shares needed to find a block
    hopPeakPoint: number;
    hopMaxStayPoing: number;
    tokenDataRefreshRate: number;
    poolDataRefreshRate: number;

};


export const APP_CONFIG: IAppConfig = {
    hopPeakPoint: 0.455,
    hopMaxStayPoing: 0.455,
    tokenDataRefreshRate: 60 * 1000, // _sec x 1000
    poolDataRefreshRate: 60 * 1000, // _sec x 1000
}
