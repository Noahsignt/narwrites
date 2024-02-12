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
