import React from 'react';
import likesimg from "../../images/likesimg.svg"; 
import { IPropsPostCard} from './types'; 
import style from "./postCard.module.css";


export function PostCard(props: IPropsPostCard) { 
  const post = props.post;
  return (
    <div className={style.postCard}>
      <div className={style.postHeader}>
        <h1 className={style.postHeaderText}>{post.title}</h1> 
      </div>
      <div className={style.postMain}>
        <div className={style.postImageDiv}>
            <img className={style.postImage} src={post.image} alt="" />
        </div>
        <div className={style.postDescriptionDiv}>
            <h1 className={style.postDescription}>{post.description}</h1>
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
                {post.tags.map((tag) => (
                    <div key={tag.id} className={style.postTagItem}>
                        <h1 className={style.postTagText}>{tag.name}</h1>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}