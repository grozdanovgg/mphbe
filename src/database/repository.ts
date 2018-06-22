import Firebase from './firebase';
import { Firestore, WriteResult } from '@google-cloud/firestore';
import Pool from '../components/Pool/Pool';


const db: Firestore = new Firebase().db;

class DB {

    public setDocInCol(collection: string, document: string, data: Object): Promise<WriteResult> {

        return db.collection(collection).doc(document).set(JSON.parse(JSON.stringify(data)))
            .then((res) => {
                return res
            })
            .catch((err) => {
                console.log(err);

                return err;
            })
    }


    public getDocInCol(collection: string, documentId: string): Promise<Pool> {

        return db.collection(collection).doc(documentId).get()
            .then((doc) => {
                return <Pool>doc.data();
            })
            .catch((err) => {
                console.log(err)

                return err;
            })
            ;
    }


    public setDocInSubcol(
        collection: string,
        document: string,
        subcollection: string,
        subdocument: string,
        data: Object): Promise<WriteResult> {

        return db.collection(collection).doc(document)
            .collection(subcollection).doc(subdocument)
            .set(JSON.parse(JSON.stringify(data)))

            .then((res) => {
                return res
            })
            .catch((err) => {
                console.log(err);

                return err;
            })
    }

    public setDocInSubcolofSubcol(
        collection: string,
        document: string,
        subcollection: string,
        subdocument: string,
        subSubcollection: string,
        subSubdocument: string,
        data: Object): Promise<WriteResult> {

        return db.collection(collection).doc(document)
            .collection(subcollection).doc(subdocument)
            .collection(subSubcollection).doc(subSubdocument)
            .set(JSON.parse(JSON.stringify(data)))

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
                console.log('Error getting documents', error);

                return error
            });
    }
}

export default new DB();