import { model, Schema } from 'mongoose';

const PoolSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    {
        collection: 'poolmodel',
        versionKey: false
    },
);

export default model('PoolModel', PoolSchema);
