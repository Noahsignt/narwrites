'use client'

import styles from "./page.module.css";
import Header from "./components/Header";
import { inputBlockInterface, articleInterface } from "@/lib/util";
import React, { useEffect, useState } from "react";
import { getAllArticles } from "@/lib/firebase/firestore/getData";

export default function Home() {
  const [displayArticles, setDisplayArticles] = useState<React.JSX.Element>(<></>);

  useEffect(() => {
    loadDisplayArticles()
  }, [])

  const inputBlockToDisplayJSX = (obj : inputBlockInterface) : React.JSX.Element => {
    switch (obj.type) {
      case 'title':
        return <h1>{obj.content}</h1>
      case 'header':
        return <h2>{obj.content}</h2>
      default:
        return <p>{obj.content}</p>
    }
  }

  const articleToJSX = (obj : articleInterface) : React.JSX.Element => {
    const editorContent : inputBlockInterface[] = obj.editorContent;

    const displayData : React.JSX.Element[] = editorContent.map((element : inputBlockInterface) : React.JSX.Element => inputBlockToDisplayJSX(element));

    return <div className={styles.article}>
      {displayData}
    </div> 
  }

  //TEMPORARY: loads every article in
  const loadDisplayArticles = () : React.JSX.Element => {
    getAllArticles()
    .then((articles) => {
      const articlesCast = articles as articleInterface[];
      const visualContent = <div className={styles.articles}>
        {articlesCast.map((article) => {
          return articleToJSX(article);
        })}
      </div>

      setDisplayArticles(visualContent);
      return visualContent;
    });

    return <></>;
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        {displayArticles}
      </main>
    </>
  );
}
