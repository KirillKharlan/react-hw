import { ITag, IPost } from "../../app/postCard/types" 

export interface IProps{
    tags: ITag[];
    setFilteredPosts: (posts: IPost[])=>void;
    filteredPosts: IPost[];
}


