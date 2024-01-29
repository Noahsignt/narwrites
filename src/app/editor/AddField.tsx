'use client'
import React, { useState } from 'react'

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
        <div className='add-field'>
            <button onClick={addHeader}>
                Add header
            </button>
            <button onClick={addParagraph}>
                Add paragraph
            </button>
        </div>
    )
}