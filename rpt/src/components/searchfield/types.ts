import { IPost } from "../postCard/types"

export interface IProps {
    setFilteredPosts: (posts: IPost[]) => void;
}