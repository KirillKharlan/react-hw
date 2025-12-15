import { useEffect, useState } from "react";
import { IProps } from "./types";
import style from "./searchfield.module.css"




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



export function InputSearch(props: IProps){
    const { filteredPosts, setFilteredPosts } = props
    const [ inputValue, setInputValue] = useState<string>("")
    useEffect(() => {
        setFilteredPosts(
            posts.filter((post) => {
                return post.title.includes(inputValue)
            })
        )
        if (!inputValue){
            setFilteredPosts([{
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

    return;

    }
    }, [inputValue])
    return(
        <div className={style.searchField}>
            <input
                className={style.inputSearch}
                type="text"
                placeholder="Пошук постів..."
                value={inputValue}
                onChange={(event)=>{
                    const input = event.target.value;
                    setInputValue(input)
            }}/>
        </div>
    )
}