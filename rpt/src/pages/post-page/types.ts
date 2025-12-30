import { Dispatch, SetStateAction } from "react";


export interface Author {
    id: number;
    firstName: string;
    secondName: string;
    avatar?: string | null;
}

export interface CommentWithAuthor {
    id: number;
    body: string;
    createdAt: string;
    author: Author;
    postId: number;
    authorId: number;
}

export interface Tag {
    id: number;
    tagName: string;
}

export interface PostResponse {
    id: number;
    name: string;
    postDescription: string;
    img: string;
    likes: number;
    createdAt: string;
    updatedAt: string;
    authorId: number;
    isLiked: boolean;
    comments: CommentWithAuthor[];
    tags: Tag[];
    author?: Author; 
}

export interface UsePostReturn {
    post: PostResponse | null;
    setPost: Dispatch<SetStateAction<PostResponse | null>>;
    isLiked: boolean;
    setIsLiked: Dispatch<SetStateAction<boolean>>;
    likesCount: number;
    setLikesCount: Dispatch<SetStateAction<number>>;
    isLoading: boolean;
    error: string | null;
}

export interface IComment extends Partial<CommentWithAuthor> {
    id: number;
    body: string;
    author: Author;
}