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

    //feed children InputField so that EditorContent state can be updated.
    const updateEditorState = (index : number, content : string) : void => {
        if(editorContent.length <= index){
            return;
        }

        const updatedObjs = [...editorContent];
        updatedObjs[index].content = content;
        setEditorContent(updatedObjs);
    }


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

        const title = editorContent[0];
        if(!title){
            console.log("Fatal Error: Title missing")
            return;
        }
        
        const name = title.content;
        if(!name){
            console.log("Fatal Error: Title missing")
            return;
        }

       addArticle(name, {
            editorContent: editorContent
        });
    }

    return (
        <main>
            <Header />
            <form method="post" className={styles['input-form']} onSubmit={handleSubmit} autoComplete="off"> 
                {inputObjsToJSX(editorContent, updateEditorState)}
                <AddField addFieldFunc={addInputField}/>
                <button type="submit" className={styles['input-save']}>Save blog</button>
            </form>
        </main>
    )
}