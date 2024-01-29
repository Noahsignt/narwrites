'use client'
import React, { useState } from 'react'
import styles from './page.module.css'

interface AddFieldProps {
    addFieldFunc : (type: string) => void;
}

export default function AddField({ addFieldFunc } : AddFieldProps) {
    const addHeader = () => {
        addFieldFunc('header');
    }

    const addParagraph = () => {
        addFieldFunc('paragraph');
    }

    return (
        <div className={styles['add-field']}>
            <button onClick={addHeader} className={styles['add-field-button']}>
                Add Header
            </button>
            <button onClick={addParagraph} className={styles['add-field-button']}>
                Add Paragraph
            </button>
        </div>
    )
}