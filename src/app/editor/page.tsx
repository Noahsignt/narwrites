'use client'
import React, { useState } from "react";
import Header from "../components/Header";
import AddField from "./AddField"
import addArticle from "@/lib/firebase/firestore/addData";

export default function Editor(){
    const [numElements, setNumElements] = useState<number>(3);
    const [editorContent, setEditorContent] = useState<React.JSX.Element>(
        <div className="editor-window">
            <label>
                Title
                <input className="title" name="1-title" />
            </label>
            <label>
                Header
                <input className="header" name="2-header" />
            </label>
            <label>
                Paragraph
                <input className="paragraph" name="3-paragraph" />
            </label>
        </div>
    )

    const addInputField = (type : string) : void => {
        const prefix : string = `${numElements + 1}`
        const name : string = `${prefix}-${type}`
        const newField : React.JSX.Element = 
            <label> 
                {type.charAt(0).toUpperCase() + type.slice(1)}
                <input className={prefix} name={name} />
            </label>
        
        setEditorContent(
            <div className="editor-window">
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
            <form method="post" onSubmit={handleSubmit}> 
                {editorContent}
                <AddField addFieldFunc={addInputField}/>
                <button type="submit">Save blog</button>
            </form>
        </main>
    )
}