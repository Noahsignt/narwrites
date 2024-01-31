'use client'
import React, { useState } from 'react'
import styles from './page.module.css'

interface InputFieldProps {
    type: string,
    content: string,
    key: string
}

export default function InputField({ type, content, key } : InputFieldProps){
    const [currentContent, setCurrentContent] = useState<string>(content);

    const onChangeInput = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> ) => {
        setCurrentContent(e.currentTarget.value);
    }

    return (
        <>
            <label key={key}>
                {type}
                {type === 'paragraph' ? <textarea className={styles['input-title']} name={key} value={currentContent} onChange={onChangeInput}/> : 
                    <input className={styles['input-title']} name={key} type={type} value={currentContent} onChange={onChangeInput}/>}
            </label>
        </>
    )
}