
export interface ITag {
    id: number;
    name: string;
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
}

export interface IFilteredProps {
    tags: { id: number; name: string }[];
    allPosts: IPost[];
    setFilteredPosts: (posts: IPost[]) => void;
}