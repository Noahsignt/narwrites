'use client'
import React, { useState } from "react";
import Header from "../components/Header";
import AddField from "./AddField"
import addArticle from "@/lib/firebase/firestore/addData";
import getArticle from "@/lib/firebase/firestore/getData"
import { inputBlockInterface, inputObjsToJSX, reconstructFromDB } from "./util";
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

    const deleteInputField = (index : number) : void => {
        const newContent = [...editorContent]
        newContent.splice(index, 1);
        setEditorContent(newContent);
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
            title: editorContent[0].content,
            editorContent: editorContent
        });
    }
    
    const getTitle = () => {
        return editorContent[0].content;
    }

    const loadBlog = () => {
        const title = getTitle();

        if(!title){
            console.log('Error: Cannot retrieve article without name');
            return;
        }

        getArticle(title)
        .then(article => {
            //construct article
            const newContent : inputBlockInterface[] = reconstructFromDB(article);

            if(!newContent.length){
                throw new Error('Fatal Error: Cannot reconstruct article');
            }
            
            setEditorContent(newContent);
        })
        .catch(error => {
            console.log(error);
            return;
        })
    }

    return (
        <main>
            <Header />
            <button onClick={loadBlog}>Load blog</button>
            <form method="post" className={styles['input-form']} onSubmit={handleSubmit} autoComplete="off"> 
                {inputObjsToJSX(editorContent, updateEditorState, deleteInputField)}
                <AddField addFieldFunc={addInputField}/>
                <button type="submit" className={styles['input-save']}>Save blog</button>
            </form>
        </main>
    )
}