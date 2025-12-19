import style from "./filter.module.css"
import { InputSearch } from "../searchfield/searchfield"
import { IPost, ITag,  } from "../../shared/types"
import { useState, useEffect } from "react"
import { IFilteredProps } from "./types"

export function Filter(props: IFilteredProps) {
    const { tags, allPosts, setFilteredPosts } = props;
    const [inputLikes, setInputLikes] = useState<number>(-1);
    const [inputTags, setInputTags] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");


    useEffect(() => {
        const result = allPosts.filter((post) => {
            const matchesSearch = post.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesLikes = post.likes > inputLikes;
            const matchesTags = inputTags 
                ? post.tags.some((tag) => tag.tagName === inputTags) 
                : true;
            return matchesSearch && matchesLikes && matchesTags;
        });
        setFilteredPosts(result);
    }, [searchQuery, inputLikes, inputTags, allPosts, setFilteredPosts]);

    return (
        <div className={style.filter}>
            <InputSearch 
                inputValue={searchQuery} 
                setInputValue={setSearchQuery} 
            />
            <div className={style.filterLikesPart}>
                <div className={style.searchLikes}> 
                    <h1 className={style.likesText}>Пошук постів по лайкам</h1>
                    <div className={style.likesFields}>
                        <div className={style.likesField}>
                            <input className={style.inputButton} type="radio" 
                                value="-1"
                                name="likesFilter" 
                                id="likebutton0" 
                                defaultChecked
                                onChange={(event) => setInputLikes(Number(event.target.value))} 
                            />
                            <label className={style.filterLabel} htmlFor="likebutton0">0 Лайків</label>
                        </div>
                        <div className={style.likesField}>
                            <input className={style.inputButton} type="radio" 
                                value="0"
                                name="likesFilter" 
                                id="likebuttonmore0" 
                                onChange={(event) => setInputLikes(Number(event.target.value))} 
                            />
                            <label className={style.filterLabel} htmlFor="likebuttonmore0">Більше 0</label>
                        </div>
                        <div className={style.likesField}>
                            <input className={style.inputButton} type="radio" 
                                value="50"
                                name="likesFilter" 
                                id="likebutton50" 
                                onChange={(event) => setInputLikes(Number(event.target.value))} 
                            />
                            <label className={style.filterLabel} htmlFor="likebutton50">Більше 50</label>
                        </div>
                        <div className={style.likesField}>
                            <input className={style.inputButton} type="radio" 
                                value="100"
                                name="likesFilter" 
                                id="likebutton100" 
                                onChange={(event) => setInputLikes(Number(event.target.value))} 
                            />
                            <label className={style.filterLabel} htmlFor="likebutton100">Більше 100</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.filterTagsPart}>
                <div className={style.tagsPart}>
                    <h1 className={style.tagsText}>Пошук постів за тегами</h1>
                    <div className={style.tags}>
                        <div className={style.tagField}>
                            <input className={style.inputButton} type="radio"
                                value=""
                                name="tagsFilter" 
                                id="all-tags"
                                defaultChecked
                                onChange={() => setInputTags("")} 
                            />
                            <label className={style.filterLabel} htmlFor="all-tags">Всі теги</label>
                        </div>
                        {tags.map((tag) => (
                            <div key={tag.id} className={style.tagField}>
                                <input className={style.inputButton} type="radio"
                                    value={tag.name}
                                    name="tagsFilter" 
                                    id={`tag-${tag.id}`}
                                    onChange={(event) => setInputTags(event.target.value)} 
                                />
                                <label className={style.filterLabel} htmlFor={`tag-${tag.id}`}>{tag.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}