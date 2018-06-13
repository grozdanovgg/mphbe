import { model, Schema, Types } from 'mongoose';
import { IPool } from "./IPoolInterface";

const PoolSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        lastBlockHtmlSelector: {
            type: String,
            required: true
        },
        lastBlockFoundNumber: {
            type: Number,
            required: false
        },
        lastBlockFoundTime: {
            type: Number,
            required: false
        },
        averageBlockFindingTime: {
            type: Number,
            required: false
        },
        hashRate: {
            type: Number,
            required: false
        },
        hopScore: {
            type: Number,
            required: false
        }

    },
    {
        collection: 'poolmodel',
        versionKey: false
    },
);

export default model('PoolModel', PoolSchema);
