'use client'
import React, { useState } from 'react'
import styles from './page.module.css'

interface InputFieldProps {
    type: string,
    content: string,
    name: string
}

export default function InputField({ type, content, name } : InputFieldProps){
    const [currentContent, setCurrentContent] = useState<string>(content);

    const onChangeInput = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> ) => {
        setCurrentContent(e.currentTarget.value);
    }

    return (
        <>
            <label key={name}>
                {type}
                {type === 'paragraph' ? <textarea className={styles['input-title']} name={name} value={currentContent} onChange={onChangeInput}/> : 
                    <input className={styles['input-title']} name={name} type="text" value={currentContent} onChange={onChangeInput}/>}
            </label>
        </>
    )
}