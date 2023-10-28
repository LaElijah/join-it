import { Media } from "@/app/_types/mediaTypes";


export const MockMediaData: Media[] = [
  {
    key: "0",
    title: "The Hobbit",
    type: "video",
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
        },
      },
    ],
    data: {
      url: "https://www.youtube.com/embed/3n3Hq7XSBjA",
      description: "This is a description",
      keywords: ["fantasy", "fiction", "adventure"],
      key: "16",
    },
  },

  // Entry 2
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
        },
      },
    ],
    data: {
      isbn: "123456789",
      cover: "https://picsum.photos/200/300",
      publisher: "Penguin",
      datePublished: "2021-01-01",
      language: "English",
      description: "This is a description",
      authors: ["George R.R. Martin"],
      keywords: ["fantasy", "fiction", "adventure", "drama"],
      key: "17",
    },
  },

  // Entry 3
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
        },
      },
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
      key: "18",
    },
  },

  // Entry 4
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
        },
      },
    ],
    data: {
      description: "This is a description",
      key: "19",
      url: "https://www.youtube.com/watch?v=V75dMMIW2B4",
      keywords: ["fantasy", "fiction", "adventure"],
    },
  },

  // Entry 5
  {
    key: "4",
    title: "The Catcher in the Rye",
    type: "book",
    subjects: ["fiction", "coming-of-age"],
    metadata: {
      submittedBy: "J.D. Salinger",
      verified: true,
      dateSubmitted: "2021-01-02",
    },
    reactions: [
      {
        likes: 0,
        dislikes: 0,
        user: {
          username: "user2",
          profile: "https://picsum.photos/200/300",
        },
        comment: {
          message: "I love this book!",
          dateSubmitted: "2021-01-02",
        },
      },
    ],
    data: {
      isbn: "987654321",
      cover: "https://picsum.photos/200/300",
      publisher: "Little, Brown and Company",
      datePublished: "2020-12-31",
      language: "English",
      description: "A classic novel about teenage rebellion.",
      authors: ["J.D. Salinger"],
      keywords: ["fiction", "coming-of-age"],
      key: "20",
    },
  },

  // Entry 6
  {
    type: "video",
    key: "5",
    title: "The Matrix",
    subjects: ["science fiction", "action"],
    metadata: {
      submittedBy: "The Wachowskis",
      verified: true,
      dateSubmitted: "2021-01-03",
    },
    reactions: [
      {
        likes: 0,
        dislikes: 0,
        user: {
          username: "user3",
          profile: "https://picsum.photos/200/300",
        },
        comment: {
          message: "One of the best sci-fi movies!",
          dateSubmitted: "2021-01-03",
        },
      },
    ],
    data: {
      description: "A mind-bending science fiction film.",
      key: "21",
      url: "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      keywords: ["science fiction", "action"],
    },
  },
];
