import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
async function addData(collection, id, data) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, collection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export default async function addArticle(name, data){
    console.log(name);
    return(addData('articles', name, data));
}