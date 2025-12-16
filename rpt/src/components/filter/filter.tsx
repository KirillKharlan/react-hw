import style from "./filter.module.css"
import { InputSearch } from "../searchfield/searchfield"
import { posts } from "../searchfield/searchfield"
import { useState } from "react"
import { IProps } from "./types"
import { useEffect } from "react"

export function Filter(props: IProps) {
    const { tags, setFilteredPosts, filteredPosts } = props
    const [ inputLikes, setInputLikes ] = useState<number>(-1)
    const [ inputTags, setInputTags ] = useState<string>("")

        useEffect(()=>{ 
            setFilteredPosts(posts.filter((post)=>{
                return post.likes > inputLikes })) 
                }, [inputLikes]) 
        useEffect(() => { 
            if (inputTags){
                setFilteredPosts( posts.filter((post) => 
                    post.tags.some((tag) => tag.name === inputTags)
            ))  
            }
        }, [inputTags])

    return (
        <div className={style.filter}>
            <InputSearch 
                filteredPosts={filteredPosts} 
                setFilteredPosts={setFilteredPosts} 
            />
            <div className={style.filterLikesPart}>
                <div className={style.searchLikes}> 
                    <h1 className={style.likesText}>Пошук постів по лайкам</h1>
                    <div className={style.likesFields}>
                        <div className={style.likesField}>
                            <input className={style.inputButton}type="radio" 
                                value= "-1"
                                name="likesFilter" 
                                id="likebutton0" 
                                onChange={(event)=>{
                                    const input = Number(event.target.value)
                                    setInputLikes(input)
                            }} />
                            <label className={style.filterLabel} htmlFor="likebutton0">0 Лайків</label>
                        </div>
                        <div className={style.likesField}>
                            <input className={style.inputButton}type="radio" 
                                value= "0"
                                name="likesFilter" 
                                id="likebuttonmore0" 
                                onChange={(event)=>{
                                    const input = Number(event.target.value)
                                    setInputLikes(input)
                            }} />
                            <label className={style.filterLabel} htmlFor="likebuttonmore0">Більше 0</label>
                        </div>
                        <div className={style.likesField}>
                            <input className={style.inputButton}type="radio" 
                                value= "50"
                                name="likesFilter" 
                                id="likebutton50" 
                                onChange={(event)=>{
                                    const input = Number(event.target.value)
                                    setInputLikes(input)
                            }} />
                            <label className={style.filterLabel} htmlFor="likebutton50">Більше 50</label>
                        </div>
                        <div className={style.likesField}>
                            <input className={style.inputButton}type="radio" 
                                value= "100"
                                name="likesFilter" 
                                id="likebutton100" 
                                onChange={(event)=>{
                                    const input = Number(event.target.value)
                                    setInputLikes(input)
                            }} />
                            <label className={style.filterLabel} htmlFor="likebutton100">Більше 100</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.filterTagsPart}>
                <div className={style.tagsPart}>
                    <h1 className={style.tagsText}>Пошук постів за тегами</h1>
                    <div className={style.tags}>
                        {tags.map((tag)=>(
                            <div key={tag.id} className={style.tagField}>
                                <input className={style.inputButton}type="radio"
                                    value= {tag.name}
                                    name="tagsFilter" 
                                    id={tag.name}
                                    onChange={(event)=>{
                                        const input = event.target.value
                                        setInputTags(input)
                                }} />
                                <label className={style.filterLabel} htmlFor={tag.name}>{tag.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}