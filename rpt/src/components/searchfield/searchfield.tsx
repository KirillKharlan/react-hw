import { IInputSearchProps } from "./types";
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



export function InputSearch(
    { inputValue, setInputValue }: IInputSearchProps
    ) 
    {
    return (
        <div className={style.sfContainer}>
            <div className={style.searchField}>
                <input
                    className={style.inputSearch}
                    type="text"
                    placeholder="Пошук постів..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
        </div>
    );
}