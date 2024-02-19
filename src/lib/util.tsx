import React from "react"
import Link from "next/link"

//single object that composes to make an article
export interface inputBlockInterface {
    type: string,
    content: string
}

//article
export interface articleInterface {
    title: string,
    editorContent: inputBlockInterface[]
}

export const inputBlockToDisplayJSX = (obj : inputBlockInterface, key : string) : React.JSX.Element => {
    switch (obj.type) {
      case 'title':
        return (
          <Link key={key} href={`/blogs/${obj.content}`}>
            <h1>{obj.content}</h1>
          </Link>
        )
      case 'header':
        return <h2 key={key}>{obj.content}</h2>
      default:
        return <p key={key}>{obj.content}</p>
    }
  }
