'use client'
import React, { useState } from "react";
import Header from "../components/Header";
import AddField from "./AddField"
import addArticle from "@/lib/firebase/firestore/addData";
import styles from './page.module.css'

export default function Editor(){
    const [numElements, setNumElements] = useState<number>(3);
    const [editorContent, setEditorContent] = useState<React.JSX.Element>(
        <div className={styles['editor-window']}>
            <label>
                Title
                <input className={styles['input-title']} name="0-title" type="text"/>
            </label>
            <label>
                Header
                <input className={styles['input-header']} name="1-header" type="text"/>
            </label>
            <label>
                Paragraph
                <textarea className={styles['input-paragraph']} name="2-paragraph"/>
            </label>
        </div>
    )

    const addInputField = (type : string) : void => {
        const prefix : string = `${numElements}`
        const name : string = `${prefix}-${type}`
        const className : string = `input-${type}`;
        const newField : React.JSX.Element = 
            <label> 
                {type.charAt(0).toUpperCase() + type.slice(1)}
                {type === 'paragraph' ? <textarea className={styles[className]} name={name}/> : 
                    <input className={styles[className]} name={name} type="text"/>}
            </label>
        
        setEditorContent(
            <div className={styles['editor-window']}>
                {React.Children.toArray([editorContent.props.children, newField])}
            </div>
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
        const title = formJson['1-title'];
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
                {editorContent}
                <AddField addFieldFunc={addInputField}/>
                <button type="submit" className={styles['input-save']}>Save blog</button>
            </form>
        </main>
    )
}