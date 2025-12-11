import style from "./postsPage.module.css";
import { useEffect, useState } from "react"
import { IProps } from "./types"; 
import { PostCard } from '../postCard/postCard';
import { posts, InputSearch } from '../searchfield/seacrhfield';





export function PostsPage(props: IProps) {
    const { tags, setFilteredPosts } = props
    const [ inputLikes, setInputLikes ] = useState<number>(-1)

    
    useEffect(() => {
        setFilteredPosts(
            posts.filter((post) => {
                return post.likes > inputLikes
            })
        )
    }, [inputLikes])

    return (
        <div className={style.postsPage}>
            <div className={style.filter}>
                <InputSearch setFilteredPosts={setFilteredPosts} />
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
                            { tags.map((tag) => {
                                return <div key = {tag.id} className={style.containerButton}>
                                        <input className={style.inputButton}type="checkbox" name = "tag" id = {"tag" + tag.id}/>
                                        <label className={style.filterLabel} htmlFor={"tag" + tag.id}>{tag.name}</label>
                                    </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.posts}>
                {props.posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}