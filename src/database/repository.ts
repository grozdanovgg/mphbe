import Firebase from './firebase';
import { Firestore, WriteResult } from '@google-cloud/firestore';
import Pool from '../models/Pool';

const db: Firestore = new Firebase().db;

class DB {

    public setDocInCollection(collection: string, document: string, data: Object): Promise<WriteResult> {

        return db.collection(collection).doc(document).set(data)
            .then((res) => {
                return res
            })
            .catch((err) => {
                console.log(err);

                return err;
            })
    }

    public getCollection(collection: string):
        Promise<{ id: string; data: Object; }[]> {

        return db.collection(collection).get()
            .then((snapshot) => {
                const collection: { id: string, data: Object }[] = [];
                snapshot.forEach((doc) => {
                    collection.push({ id: doc.id, data: doc.data() })
                    console.log(doc.id, '=>', doc.data());
                });

                return collection;
            })
            .catch((error) => {
                return error
                console.log('Error getting documents', error);
            });
    }

    public getDocInCollection(collection: string, documentId: string): Pool {

        return db.collection(collection).doc(documentId);
    }
}

export default new DB();