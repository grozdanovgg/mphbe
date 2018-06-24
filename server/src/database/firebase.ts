import * as admin from 'firebase-admin';
import { DocumentReference, WriteResult, Firestore } from '@google-cloud/firestore';

const serviceAccount: admin.ServiceAccount =
    require('../../../../pool-hopping-firebase-adminsdk-va3cv-e99d82882a.json');

export default class Firebase {

    public db: Firestore;

    constructor() {

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://pool-hopping.firebaseio.com'
        });

        this.db = admin.firestore();

    }
}