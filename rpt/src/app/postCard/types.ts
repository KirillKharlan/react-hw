export interface ITag {
    id: number;
    name: string;
}

export interface IPost {
    id: number;
    title: string;
    description: string;
    image: string;
    userId: number;
    likes: number;
    tags: ITag[];
}

export interface IPropsPostCard {
    post: IPost
}