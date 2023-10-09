export type Metadata = {
    submittedBy: string,
    verified: boolean,
    dateSubmitted: string,
}

export type BookData = {
    isbn: string,
    cover: string,
    authors: string[],
    url?: Blob,
    description: string,
    publisher: string,
    datePublished: string,
    language: string,
    keywords: string[],
    key: string,


}

export type VideoData = {
    url: string,
    description: string
    keywords: string[],
    key: string,
}

export type CommentItem = {
    message: string,
    dateSubmitted: string,
}

export type Reaction = {
    likes: number,
    dislikes: number,
    user: {
        username: string,
        profile: string,
    },
    comment: CommentItem
}

export type MediaData = BookData | VideoData

export type Media = {
    key: string,
    title: string,
    type: "book" | "video" | "article" | "podcast" | "other", 
    subjects: string[],
    metadata: Metadata,
    reactions: Reaction[]
    data: BookData | VideoData
    
}