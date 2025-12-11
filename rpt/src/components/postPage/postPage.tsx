import { PostsPage } from "../postsPage/postsPage"
import style from "./postPage.module.css";
import { posts } from '../searchfield/seacrhfield';
import { useState } from "react";
import { IPost } from "../postCard/types";


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

export function PostPage() {

  return (
    <div className={style.postPage}>
        <PostsPage 
            posts={posts} 
            tags={tagsList} 
            setFilteredPosts={()=>{}} />
    </div>
  );
}
