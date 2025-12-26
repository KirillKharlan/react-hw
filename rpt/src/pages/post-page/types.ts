export interface ITag {
    id: number;
    name: string;
}

export interface IComment {
    id: number;
    body: string;
    postId: number;
    authorId: number;
    author: {
        firstName: string;
        secondName: string;
    };
}

export interface IPost {
    id: number;
    name: string;
    postDescription: string;
    img: string;
    likes: number;
    createdById: number;
    categoryId: number | null;
    tags: {
        postId: number;
        tagName: string;
    }[];
    comments?: IComment[];
}

export interface IPropsPostCard {
    post: IPost;
}