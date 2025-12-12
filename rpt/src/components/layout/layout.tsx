import style from "./layout.module.css"
import { PostCard } from "../postCard/postCard"
import { Header } from "../header/header"
import { useState } from "react"
import { IPost } from "../postCard/types"
import { PostPage } from "../postPage/postPage"
import { Outlet } from "react-router-dom"
import { PostsPage } from "../postsPage/postsPage"


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


export function Layout() {

    const [ filteredPosts, setFilteredPosts ] = useState<IPost[]>([
    {
        id: 0,
        title: "First Post",
        description: "Programming is awesome!",
        image: "image.png",
        userId: 1,
        likes: 10,
        tags: [{
            id: 0,
            name: "#Programming"
        },
        {
            id: 1,
            name: "#Typescript"
        }]
    },
    {
        id: 1,
        title: "Second Post",
        description: "My second post",
        image: "image.png",
        userId: 1,
        likes: 56,
        tags: [{
            id: 0,
            name: "#React"
        },
        {
            id: 1,
            name: "Typescript"
        }]
    },
    {
        id: 2,
        title: "Third Post",
        description: "Hello world!",
        image: "image.png",
        userId: 2,
        likes: 3,
        tags: [{
            id: 0,
            name: "#Programming"
        },
        {
            id: 1,
            name: "#React"
        }]
    }
    ])
    
    return (
        <div className={style.layout}>
            <Header />
            <main className={style.layoutContent}>

                <Outlet context = {{ setFilteredPosts, tagsList}}/>
                <PostPage />
            </main>
        </div>
    );

}