import style from "./filter.module.css";
import { InputSearch } from "../searchfield/searchfield";
import { IFilteredProps } from "../../shared/types";
import { usePostContext } from "../../context/PostsContext"; 
import { useLocalization } from "../../context/LocalizationContext"; 

export function Filter({ tags }: IFilteredProps) {
    const { 
        minLikes, 
        setMinLikes,
        setSelectedTag
    } = usePostContext();
    const { translate } = useLocalization();

    const handleChildClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className={style.filter}>
            <InputSearch />

            <div className={style.filterLikesPart}>
                <div className={style.searchLikes}> 
                    <h1 className={style.likesText}>{translate("filter.title_likes")}</h1>
                    <div className={style.likesFields}>
                        
                        <div className={style.likesField} onClick={() => setMinLikes(0)}>
                            <input className={style.inputButton} type="radio" 
                                value="0"
                                name="likesFilter" 
                                id="likebutton0" 
                                checked={minLikes === 0}
                                onChange={(event) => setMinLikes(Number(event.target.value))}
                                onClick={handleChildClick}
                            />
                            <label className={style.filterLabel} htmlFor="likebutton0" onClick={handleChildClick}>
                                {translate("filter.zero_likes")}
                            </label>
                        </div>

                        <div className={style.likesField} onClick={() => setMinLikes(1)}>
                            <input className={style.inputButton} type="radio" 
                                value="1"
                                name="likesFilter" 
                                id="likebuttonmore0" 
                                checked={minLikes === 1}
                                onChange={(event) => setMinLikes(Number(event.target.value))}
                                onClick={handleChildClick}
                            />
                            <label className={style.filterLabel} htmlFor="likebuttonmore0" onClick={handleChildClick}>
                                {translate("filter.more_than", { count: 0 })}
                            </label>
                        </div>

                        <div className={style.likesField} onClick={() => setMinLikes(50)}>
                            <input className={style.inputButton} type="radio" 
                                value="50"
                                name="likesFilter" 
                                id="likebutton50" 
                                checked={minLikes === 50}
                                onChange={(event) => setMinLikes(Number(event.target.value))}
                                onClick={handleChildClick}
                            />
                            <label className={style.filterLabel} htmlFor="likebutton50" onClick={handleChildClick}>
                                {translate("filter.more_than", { count: 50 })}
                            </label>
                        </div>

                        <div className={style.likesField} onClick={() => setMinLikes(100)}>
                            <input className={style.inputButton} type="radio" 
                                value="100"
                                name="likesFilter" 
                                id="likebutton100" 
                                checked={minLikes === 100}
                                onChange={(event) => setMinLikes(Number(event.target.value))}
                                onClick={handleChildClick}
                            />
                            <label className={style.filterLabel} htmlFor="likebutton100" onClick={handleChildClick}>
                                {translate("filter.more_than", { count: 100 })}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.filterTagsPart}>
                <div className={style.tagsPart}>
                    <h1 className={style.tagsText}>{translate("filter.title_tags")}</h1>
                    <div className={style.tags}>
                        <div className={style.tagField} onClick={() => setSelectedTag && setSelectedTag("")}>
                            <input className={style.inputButton} type="radio"
                                value=""
                                name="tagsFilter" 
                                id="all-tags"
                                defaultChecked
                                onClick={handleChildClick}
                            />
                            <label className={style.filterLabel} htmlFor="all-tags" onClick={handleChildClick}>
                                {translate("filter.all_tags")}
                            </label>
                        </div>
                        {tags.map((tag) => (
                            <div key={tag.id} className={style.tagField} onClick={() => setSelectedTag && setSelectedTag(tag.name)}>
                                <input className={style.inputButton} type="radio"
                                    value={tag.name}
                                    name="tagsFilter" 
                                    id={`tag-${tag.id}`}
                                    onClick={handleChildClick}
                                />
                                <label className={style.filterLabel} htmlFor={`tag-${tag.id}`} onClick={handleChildClick}>
                                    {tag.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}