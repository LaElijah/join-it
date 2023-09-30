

import FeaturedMedia from "@/app/_components/featuredMedia";
import MediaShelf from "@/app/_components/mediaShelf";
import { Media } from "@/app/_types/index";

export default function Shelf() {

    const mediaData: Media[] = [
        {
            key: "0",
            title: "The Hobbit",
            type: "book",
            subjects: ["fantasy", "fiction", "adventure"],
            metadata: {
                submittedBy: "J.R.R. Tolkien",
                verified: true,
                dateSubmitted: "2021-01-01",
            },
            reactions: [
                {
                    likes: 0,
                    dislikes: 0,
                    user: {
                        username: "user1",
                        profile: "https://picsum.photos/200/300",
                    },
                    comment: {
                        message: "This is a comment",
                        dateSubmitted: "2021-01-01",
                    }

                }
            ],
            data: {
                isbn: "123456789",
                cover: "https://picsum.photos/200/300",
                publisher: "Penguin",
                datePublished: "2021-01-01",
                language: "English",
                description: "This is a description",
                authors: ["J.R.R. Tolkien"],
                keywords: ["fantasy", "fiction", "adventure"],
                key: "16"

            }

        },
        {
            key: "1",
            title: "A Song of Ice and Fire",
            type: "book",
            subjects: ["fantasy", "fiction", "adventure", "drama"],
            metadata: {
                submittedBy: "George R.R. Martin",
                verified: true,
                dateSubmitted: "2021-01-01",
            },
            reactions: [
                {
                    likes: 0,
                    dislikes: 0,
                    user: {
                        username: "user1",
                        profile: "https://picsum.photos/200/300",
                    },
                    comment: {
                        message: "This is a comment",
                        dateSubmitted: "2021-01-01",
                    }

                }
            ],
            data: {
                isbn: "123456789",
                cover: "https://picsum.photos/200/300",
                publisher: "Penguin",
                datePublished: "2021-01-01",
                language: "English",
                description: "This is a description",
                authors: ["J.R.R. Tolkien"],
                keywords: ["fantasy", "fiction", "adventure", "drama"],
                key: "17"
            }

        },
        {
            key: "2",
            title: "The Lord of the Rings",
            type: "book",
            subjects: ["fantasy", "fiction", "adventure"],
            metadata: {
                submittedBy: "J.R.R. Tolkien",
                verified: true,
                dateSubmitted: "2021-01-01",
            },
            reactions: [
                {
                    likes: 0,
                    dislikes: 0,
                    user: {
                        username: "user1",
                        profile: "https://picsum.photos/200/300",
                    },
                    comment: {
                        message: "This is a comment",
                        dateSubmitted: "2021-01-01",
                    }

                }
            ],
            data: {
                isbn: "123456789",
                cover: "https://picsum.photos/200/300",
                publisher: "Penguin",
                datePublished: "2021-01-01",
                language: "English",
                description: "This is a description",
                authors: ["J.R.R. Tolkien"],
                keywords: ["fantasy", "fiction", "adventure"],
                key: "18"

            }
        },

        {
            type: "video",
            key: "3",
            title: "The Fellowship of the Ring",
            subjects: ["fantasy", "fiction", "adventure"],
            metadata: {
                submittedBy: "J.R.R. Tolkien",
                verified: true,
                dateSubmitted: "2021-01-01",
            },
            reactions: [
                {
                    likes: 0,
                    dislikes: 0,
                    user: {
                        username: "user1",
                        profile: "https://picsum.photos/200/300",
                    },
                    comment: {
                        message: "This is a comment",
                        dateSubmitted: "2021-01-01",
                    }

                }
            ],
            data: {
                description: "This is a description",
                key: "19",
                url: "https://www.youtube.com/watch?v=V75dMMIW2B4",
                keywords: ["fantasy", "fiction", "adventure"],
            },
        },




    ]

    return (
        <section>
            <h2>Bookshelf</h2>
            <p>Bookshelf</p>


            <FeaturedMedia mediaData={mediaData[0]} />

            <MediaShelf mediaData={mediaData} />


        </section>
    )
}