'use client'
import React, { useState } from "react";
import Header from "../components/Header";
import AddField from "./AddField"
import addArticle from "@/lib/firebase/firestore/addData";
import { inputBlockInterface, inputObjsToJSX } from "./util";
import styles from './page.module.css'

export default function Editor(){
    const [editorContent, setEditorContent] = useState<inputBlockInterface[]>(
        [
            {
                type: 'title',
                content: ''
            },
            {
                type: 'header',
                content: ''
            },
            {
                type: 'paragraph',
                content: ''
            }
        ]
    )
    const [numElements, setNumElements] = useState<number>(3);

    const addInputField = (type : string) : void => {
        setEditorContent(
            [
                ...editorContent,
                {
                    type: type,
                    content: ''
                }
            ]
        )
        setNumElements(numElements + 1);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        if(!formData){
            console.log("Fatal Error: No form data")
            return;
        }
        const formJson = Object.fromEntries(formData.entries());

        const title = formJson['0-title'];
        if(!title){
            console.log("Fatal Error: Title missing")
            return;
        }
        addArticle(title, formJson);
    }

    return (
        <main>
            <Header />
            <form method="post" className={styles['input-form']} onSubmit={handleSubmit} autoComplete="off"> 
                {inputObjsToJSX(editorContent)}
                <AddField addFieldFunc={addInputField}/>
                <button type="submit" className={styles['input-save']}>Save blog</button>
            </form>
        </main>
    )
}