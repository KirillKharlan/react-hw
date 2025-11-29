import React from 'react';
import likesimg from "./images/likesimg.svg"; 
import { IPostCard, ITag } from './types'; 
import style from "./static/styles/Posts.module.css";


export function PostCard(props: IPostCard) { 
  const { id, title, shortDescription, image, tags } = props;
  const visibleTags = tags.slice(0, 3); 
  return (
    <div className={style.postCard}>
      <div className={style.postHeaer}>
        <h1 className={style.postHeaderText}>{title}</h1> 
      </div>
      <div className={style.postMain}>
        <div className={style.postImageDiv}>
            {image && <img className={style.postImage} src={image} alt={title} />}
        </div>
        <div className={style.postDescriptionDiv}>
            <h1 className={style.postDescription}>{shortDescription}</h1>
        </div>
      </div>
      <div className={style.postFooter}>
        <div className={style.postFooterLikes}>
            <img className={style.postLikesImg} src={likesimg} alt="Лайки" />
            <h1 className={style.postLikes}>15</h1> 
            <h1 className={style.postLikesText}>Likes</h1>
        </div>
        <div className={style.postFooterTags}>
            <div className={style.postTags}>
                <h1 className={style.postTagsText}>Tags:</h1>
            </div>
            <div className={style.postTagsList}>
                {visibleTags.map((tag: ITag, index: number) => (
                    <h1 
                        key={tag.id}
                        className={style[`${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}Tag`]} 
                    >
                        #{tag.name}
                    </h1>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}