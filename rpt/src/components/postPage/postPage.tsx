import { PostsPage } from "../postsPage/postsPage"
import style from "./postPage.module.css";


const postsList = [
    {
        id: 0,
        title: "First Post",
        description: "Programming is awesome!",
        image: "image.png",
        userId: 1,
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
        tags: [{
            id: 0,
            name: "#React"
        },
        {
            id: 1,
            name: "Typescript"
        }]
    },
    
]

const tagsList = [
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
    <div className = {style.postPage}>
        <PostsPage posts = {postsList} tags = {tagsList}></PostsPage> 
    </div>
  );
}
