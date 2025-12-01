import { PostsPage } from "../postsPage/postsPage"
import { Header } from "../header/header"
import { Main } from "../main/main"
import style from "./static/styles/App.module.css";


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

export function MainPage() {
  return (
    <div className = {style.mainPage}>
            <Header></Header>
            <Main>
              <PostsPage posts = {postsList} tags = {tagsList}></PostsPage> 
            </Main>
        </div>
  );
}
