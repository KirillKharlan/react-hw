import donecircle from "./images/donecircle.svg";
import nodonecircle from "./images/nodonecircle.svg";
import "./static/styles/Posts.module.css";
import { IProps, IPostCard, ITag } from "./types"; 
import { PostCard } from './postCard';


const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};


export function Posts(props: IProps) {
    const { products, tags } = props;
    const descriptionMaxLength = 150;
    const postCardsData: IPostCard[] = products.map((post) => ({
        id: post.id,
        title: post.title,
        shortDescription: truncateText(post.description, descriptionMaxLength), 
        image: post.image,
        tags: post.tags,
    }));
    return (
        <div className="App">
            <div className="posts">
                {postCardsData.map((cardData: IPostCard) => (
                    <PostCard 
                        key={cardData.id} 
                        {...cardData}
                    />
                ))}
            </div>
            <div className="filter">
                <div className="filter-likes-part">
                    <div className="search-field">
                        <h1 className="search-field-text">Пошук постів</h1>
                    </div>
                    <div className="search-likes">
                        <h1 className="likes-text">Пошук постів по лайкам</h1>
                        <div className="likes-fields">
                            <div className="likes-field-one">
                                <img className="field-one-img" src={donecircle} alt="" />
                                <div className="field-one-text-div">
                                    <h1 className="field-one-text">0 Лайків</h1>
                                </div>
                            </div>
                            <div className="likes-field-two">
                                <img className="field-two-img" src={nodonecircle} alt="" />
                                <div className="field-two-text-div">
                                    <h1 className="field-two-text">Більше 0</h1>
                                </div>
                            </div>
                            <div className="likes-field-three">
                                <img className="field-three-img" src={nodonecircle} alt="" />
                                <div className="field-three-text-div">
                                    <h1 className="field-three-text">Більше 50</h1>
                                </div>
                            </div>
                            <div className="likes-field-four">
                                <img className="field-four-img" src={nodonecircle} alt="" />
                                <div className="field-four-text-div">
                                    <h1 className="field-four-text">Більше 100</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter-tags-part">
                    <div className="tags-part">
                        <h1 className="tags-text">Пошук постів за тегами</h1>
                        <div className="tags">
                            {tags.map((tag) => (
                                <div key={tag.id} className="tag-item">
                                    <h1 className="tag-item-text">{tag.name}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}