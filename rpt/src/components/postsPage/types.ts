import { ITag, IPost } from "../postCard/types" 

export interface IProps {
    tags: ITag[];
    setFilteredPosts: (posts: IPost[]) => void;
    posts: IPost[];
}
