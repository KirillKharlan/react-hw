import donecircle from "../../images/donecircle.svg";
import nodonecircle from "../../images/nodonecircle.svg";
import style from "./postsPage.module.css";
import { IProps } from "./types"; 
import { PostCard } from '../postCard/postCard';




export function PostsPage(props: IProps) {
    const posts  = props.posts;
    const tags = props.tags;
    return (
        <div className={style.postsPage}>
            <div className={style.filter}>
                <div className={style.filterLikesPart}>
                    <div className={style.searchField}>
                        <h1 className={style.searchFieldText}>Пошук постів</h1>
                    </div>
                    <div className={style.searchLikes}> 
                        <h1 className={style.likesText}>Пошук постів по лайкам</h1>
                        <div className={style.likesFields}>
                            <div className={style.likesFieldOne}>
                                <img className={style.fieldOneImg} src={donecircle} alt="" />
                                <div className={style.fieldOneTextDiv}>
                                    <h1 className={style.fieldOneText}>0 Лайків</h1>
                                </div>
                            </div>
                            <div className={style.likesFieldTwo}>
                                <img className={style.fieldTwoImg} src={nodonecircle} alt="" />
                                <div className={style.fieldTwoTextDiv}>
                                    <h1 className={style.fieldTwoText}>Більше 0</h1>
                                </div>
                            </div>
                            <div className={style.likesFieldThree}>
                                <img className={style.fieldThreeImg} src={nodonecircle} alt="" />
                                <div className={style.fieldThreeTextDiv}>
                                    <h1 className={style.fieldThreeText}>Більше 50</h1>
                                </div>
                            </div>
                            <div className={style.likesFieldFour}>
                                <img className={style.fieldFourImg} src={nodonecircle} alt="" />
                                <div className={style.fieldFourTextDiv}>
                                    <h1 className={style.fieldFourText}>Більше 100</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.filterTagsPart}>
                    <div className={style.tagsPart}>
                        <h1 className={style.tagsText}>Пошук постів за тегами</h1>
                        <div className={style.tags}>
                            {tags.map((tag) => (
                                <div key={tag.id} className={style.tagItem}>
                                    <h1 className={style.tagText}>{tag.name}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.posts}>
                { posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}