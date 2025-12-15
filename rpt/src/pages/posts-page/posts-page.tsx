import style from "./posts-page.module.css";
import { posts } from '../../components/searchfield/seacrhfield';
import { useState } from "react";
import { IPost } from "../../app/postCard/types";
import { Filter } from "../../components/filter/filter";
import { PostsList } from "../../app/postsList";


export const tagsList = [
    {
        id: 0,
        name: "#Programming"
    },
    {
        id: 1,
        name: "#Typescript"
    },
    {
        id: 2,
        name: "#React"
    }
]

export function PostsPage() {
    const [ filteredPosts, setFilteredPosts ] = useState<IPost[]>(posts)

    function setFilteredPostsWrapper(posts: IPost[]) {
        setFilteredPosts(posts)
    }

    return (
        <div className={style.postPage}>
            <Filter 
                tags={tagsList} 
                setFilteredPosts={setFilteredPostsWrapper} 
                filteredPosts={filteredPosts}
            />
            <PostsList posts={filteredPosts} />
        </div>
    );
}
