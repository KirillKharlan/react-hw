import style from "./layout.module.css"
import { Header } from "../header/header"
import { PostsList } from "../postsList/postsList"




export const posts = [
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
    ]
export function Layout() {
    return (
        <div className={style.layout}>
            <Header />
            <main className={style.layoutContent}>
                <PostsList posts={posts} />
            </main>
        </div>
    );

}