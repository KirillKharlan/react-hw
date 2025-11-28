import donecircle from "./images/donecircle.svg";
import nodonecircle from "./images/nodonecircle.svg";
import "./static/styles/Posts.css";
import { IProps} from "./types";


export function Posts(props: IProps) {
    const { products, tags } = props;
    return (
        <div className="App">
            <div className="posts">
                {products.map((post) => (
                    <div key={post.id} className="post-item">
                        {post.image && (
                           <img className="post-image" src={post.image} alt={post.title} />
                        )}
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-description">{post.description}</p>
                        <div className="post-tags-container">
                            {post.tags.map(tag => (
                                <span key={tag.id} className="post-tag">
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                        <div className="post-meta">
                           <p>Автор ID: {post.userId}</p>
                        </div>
                    </div>
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
                        <h1 className="tags-text"></h1>
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