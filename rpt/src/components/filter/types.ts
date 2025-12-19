import { ITag, IPost } from "../../app/postCard/types" 

export interface IFilteredProps {
    tags: { id: number; name: string }[];
    allPosts: IPost[];
    setFilteredPosts: (posts: IPost[]) => void;
}


