import { ITag, IPost } from "../../app/postCard/types" 

export interface IFilteredProps{
    tags: ITag[];
    setFilteredPosts: (posts: IPost[])=>void;
    filteredPosts: IPost[];
}


