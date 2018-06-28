import Firebase from './firebase';
import { Firestore, WriteResult } from '@google-cloud/firestore';
import IFilter from './IFilter';


const db: Firestore = new Firebase().db;

class Repository {

    getCol(collection: string):
        Promise<Document[]> {

        return db.collection(collection).get()
            .then((snapshot) => {
                const collection: Document[] = [];
                snapshot.forEach((doc) => {
                    collection.push(doc.data())
                    console.log(doc.data());
                });

                return collection;
            })
            .catch((error) => {
                console.log('Error getting documents', error);

                return error
            });
    }

    setDocInCol(collection: string, document: string, data: Document): Promise<WriteResult> {

        return db.collection(collection).doc(document).set(JSON.parse(JSON.stringify(data)))
            .then((res) => {
                return res
            })
            .catch((err) => {
                console.log(err);

                return err;
            })
    }


    getDocInCol(collection: string, documentId: string): Promise<Document> {

        return db.collection(collection).doc(documentId).get()
            .then((doc: Document) => {
                return doc['data']();
            })
            .catch((err) => {
                console.log(err)

                return err;
            })
            ;
    }


    setDocInSubcol(
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

    getDocInSubcol(
        collection: string,
        document: string,
        subcollection: string,
        subdocument: string, ): Promise<Document> {

        return db.collection(collection).doc(document)
            .collection(subcollection).doc(subdocument)
            .get()
            .then((res: Document) => {
                return res
            })
            .catch((err) => {
                console.log(err);

                return err;
            })
    }

    getSubcolOfDoc(
        collection: string,
        document: string,
        subcollection: string,
    ): Promise<Document[]> {

        return db.collection(collection).doc(document).collection(subcollection).get()
            .then((snapshot) => {
                const collection: Document[] = [];
                snapshot.forEach((doc) => {
                    collection.push(doc.data())
                    console.log(doc.data());
                });

                return collection;
            })
            .catch((error) => {
                console.log('Error getting documents', error);

                return error
            });
    }

    setDocInSubcolofSubcol(
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

    getDocInSubcolofSubcol(
        collection: string,
        document: string,
        subcollection: string,
        subdocument: string,
        subSubcollection: string,
        subSubdocument: string, ): Promise<Document> {

        return db.collection(collection).doc(document)
            .collection(subcollection).doc(subdocument)
            .collection(subSubcollection).doc(subSubdocument)
            .get()
            .then((res: Document) => {
                return res
            })
            .catch((err) => {
                console.log(err);

                return err;
            })
    }

    getSubcolOfDocOfSubcol(
        collection: string,
        document: string,
        subcollection: string,
        subdocument: string,
        subSubcollection: string,
    ): Promise<Document[]> {

        return db.collection(collection).doc(document)
            .collection(subcollection).doc(subdocument)
            .collection(subSubcollection)
            .get()
            .then((snapshot) => {
                const collection: Document[] = [];
                snapshot.forEach((doc) => {
                    collection.push(doc.data())
                    console.log(doc.data());
                });

                return collection;
            })
            .catch((error) => {
                console.log('Error getting documents', error);

                return error
            });
    }

    getSubcolOfDocOfSubcolFilter(
        collection: string,
        document: string,
        subcollection: string,
        subdocument: string,
        subSubcollection: string,
        filter: IFilter
    ): Promise<Document[]> {

        return db.collection(collection).doc(document)
            .collection(subcollection).doc(subdocument)
            .collection(subSubcollection)
            .where(filter.fieldToFilter, filter.comparOperator, filter.value)
            .get()
            .then((snapshot) => {
                const collection: Document[] = [];
                snapshot.forEach((doc) => {
                    collection.push(doc.data())
                    console.log(doc.data());
                });

                return collection;
            })
            .catch((error) => {
                console.log('Error getting documents', error);

                return error
            });
    }


}

export default new Repository();