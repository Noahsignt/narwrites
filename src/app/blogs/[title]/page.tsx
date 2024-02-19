'use client'

import Header from "@/app/components/Header"
import { getArticle } from "@/lib/firebase/firestore/getData"
import { articleInterface, inputBlockInterface, inputBlockToDisplayJSX } from "@/lib/util";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { title: string } }) {
    const [article, setArticle] = useState<React.JSX.Element>()

    useEffect(() => {
      getArticle(params.title)
      .then((article) => setArticle(articleToJSX(article as articleInterface)))
    }, []);
    

    const articleToJSX = (obj : articleInterface) : React.JSX.Element => {
        const editorContent : inputBlockInterface[] = obj.editorContent;
    
        const displayData : React.JSX.Element[] = editorContent.map((element : inputBlockInterface, idx : number) : React.JSX.Element => 
          inputBlockToDisplayJSX(element, `${element.type}${idx}`));
    
        return <div className={styles.article}>
          {displayData}
        </div> 
      }

    return (
    <>
        <Header />
        {article}
    </>)
}
