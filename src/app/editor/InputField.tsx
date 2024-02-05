'use client'
import React, { useState, useEffect } from 'react'
import styles from './page.module.css'

interface InputFieldProps {
    type: string,
    content: string,
    index: number,
    updateFormState: (index: number, content: string) => void,
    deleteSelf: (index: number) => void
}

export default function InputField({ type, content, index, updateFormState, deleteSelf } : InputFieldProps){
    const [currentContent, setCurrentContent] = useState<string>(content);
    
    const onChangeInput = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> ) => {
        setCurrentContent(e.currentTarget.value);
        updateFormState(index, e.currentTarget.value);
    }

    const onClickDelete = (e : React.FormEvent) => {
        e.preventDefault();
        deleteSelf(index);
    }

    return (
        <>
            <label>
                <div className={styles['input-top-bar']}>
                    {type}
                    {type !== 'title' ? <button onClick={onClickDelete}>X</button> : <></>}
                </div>
                {type === 'paragraph' ? <textarea className={styles['input-title']} value={content} onChange={onChangeInput}/> : 
                    <input className={styles['input-title']} type="text" value={content} onChange={onChangeInput}/>}
            </label>
        </>
    )
}