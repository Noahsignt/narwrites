'use client'
import React, { useState } from "react";
import Header from "../components/header";
import addArticle from "@/lib/firebase/firestore/addData";

export default function Editor(){
    const [editorContent, setEditorContent] = useState<React.JSX.Element>(
        <div className="editor-window">
            <label>
                Title
                <input className="title" name="1-title" />
            </label>
            <label>
                Header 1
                <input className="header" name="2-header" />
            </label>
            <label>
                Paragraph 1
                <input className="paragraph" name="3-paragraph" />
            </label>
        </div>
    )

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
    };

    return (
        <main>
            <Header />
            <form method="post" onSubmit={handleSubmit}> 
                {editorContent}
                <button type="submit">Save blog</button>
            </form>
        </main>
    )
}