export declare type Metadata = {
  submittedBy: string;
  verified: boolean;
  dateSubmitted: string;
};

export declare type BookData = {
  isbn: string;
  cover: string;
  authors: string[];
  url?: Blob;
  description: string;
  publisher: string;
  datePublished: string;
  language: string;
  keywords: string[];
  key: string;
};

export declare type VideoData = {
  url: string;
  description: string;
  keywords: string[];
  key: string;
};

export declare type CommentItem = {
  message: string;
  dateSubmitted: string;
};

export declare type Reaction = {
  likes: number;
  dislikes: number;
  user: {
    username: string;
    profile: string;
  };
  comment: CommentItem;
};

export declare type MediaData = BookData | VideoData;

export declare interface Media {
  key: string;
  title: string;
  type: "book" | "video" | "article" | "podcast" | "other";
  subjects: string[];
  metadata: Metadata;
  reactions: Reaction[];
  data: BookData | VideoData;
};
