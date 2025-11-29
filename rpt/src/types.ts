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
    tags: ITag[];
}

export interface IProps {
    products: IPost[];
    tags: ITag[];
}

export interface IPostCard{
    id: number;
    title: string;
    shortDescription: string;
    image: string;
    tags: ITag[];
}

export interface IPropsPostCard {
    postCards: IPostCard[];
}