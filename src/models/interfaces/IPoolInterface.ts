export interface IPool {

    name: {
        type: string,
        required: boolean
    },
    url: {
        type: string,
        required: boolean
    },
    lastBlockHtmlSelector: {
        type: string,
        required: boolean
    },
    lastBlockFoundNumber?: {
        type: number,
        required: boolean
    },
    lastBlockFoundTime?: {
        type: number,
        required: boolean
    },
};