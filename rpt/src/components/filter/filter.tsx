import style from "./filter.module.css";
import { InputSearch } from "../searchfield/searchfield";
import { IFilteredProps } from "../../shared/types";
import { usePostContext } from "../../context/PostsContext"; 

export function Filter({ tags }: IFilteredProps) {
    const { 
        minLikes, 
        setMinLikes,
    } = usePostContext();

    return (
        <div className={style.filter}>
            <InputSearch />

            <div className={style.filterLikesPart}>
                <div className={style.searchLikes}> 
                    <h1 className={style.likesText}>Пошук постів по лайкам</h1>
                    <div className={style.likesFields}>
                        <div className={style.likesField}>
                            <input className={style.inputButton} type="radio" 
                                value="0"
                                name="likesFilter" 
                                id="likebutton0" 
                                checked={minLikes === 0}
                                onChange={(event) => setMinLikes(Number(event.target.value))} 
                            />
                            <label className={style.filterLabel} htmlFor="likebutton0">0 Лайків</label>
                        </div>

                        <div className={style.likesField}>
                            <input className={style.inputButton} type="radio" 
                                value="1"
                                name="likesFilter" 
                                id="likebuttonmore0" 
                                checked={minLikes === 1}
                                onChange={(event) => setMinLikes(Number(event.target.value))} 
                            />
                            <label className={style.filterLabel} htmlFor="likebuttonmore0">Більше 0</label>
                        </div>

                        <div className={style.likesField}>
                            <input className={style.inputButton} type="radio" 
                                value="50"
                                name="likesFilter" 
                                id="likebutton50" 
                                checked={minLikes === 50}
                                onChange={(event) => setMinLikes(Number(event.target.value))} 
                            />
                            <label className={style.filterLabel} htmlFor="likebutton50">Більше 50</label>
                        </div>

                        <div className={style.likesField}>
                            <input className={style.inputButton} type="radio" 
                                value="100"
                                name="likesFilter" 
                                id="likebutton100" 
                                checked={minLikes === 100}
                                onChange={(event) => setMinLikes(Number(event.target.value))} 
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
                            />
                            <label className={style.filterLabel} htmlFor="all-tags">Всі теги</label>
                        </div>
                        {tags.map((tag) => (
                            <div key={tag.id} className={style.tagField}>
                                <input className={style.inputButton} type="radio"
                                    value={tag.name}
                                    name="tagsFilter" 
                                    id={`tag-${tag.id}`}
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