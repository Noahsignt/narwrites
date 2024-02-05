import firebase_app from "../config";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function getArticle(name){
    try{
        const articlesRef = collection(db, "articles");
        const q = query(articlesRef, where("title", "==", name));
        const res = await getDocs(q);

        if(!res.empty){
            return res.docs[0].data().editorContent;
        }

        return null;
    } catch(error){
        console.log(error);

        return null;
    }
}