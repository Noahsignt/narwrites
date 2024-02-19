'use client'

import styles from "./page.module.css";
import Header from "./components/Header";
import { inputBlockInterface, articleInterface } from "@/lib/util";
import React, { useEffect, useState } from "react";
import { inputBlockToDisplayJSX } from "@/lib/util";
import { getAllArticles } from "@/lib/firebase/firestore/getData";

export default function Home() {
  const [displayArticles, setDisplayArticles] = useState<React.JSX.Element>(<></>);

  useEffect(() => {
    loadDisplayArticles()
  }, [])

  const articleToJSX = (obj : articleInterface) : React.JSX.Element => {
    const editorContent : inputBlockInterface[] = obj.editorContent;

    const displayData : React.JSX.Element[] = editorContent.map((element : inputBlockInterface, idx: number) : React.JSX.Element => 
      inputBlockToDisplayJSX(element, `${element.type}${idx}`));

    //render title and preview paragraph
    return <div className={styles.article}>
      {displayData[0]}
      {displayData[1]}
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
