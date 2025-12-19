import React from 'react';
import { ICONS } from "../../shared";
import { IPropsPostCard} from './types'; 
import style from "./postCard.module.css";


const Likesimg = ICONS.likesimg;
export function PostCard(props: IPropsPostCard) { 
  const post = props.post;
  return (
    <div className={style.postCard}>
      <div className={style.postHeader}>
        <h1 className={style.postHeaderText}>{post.name}</h1> 
      </div>
      <div className={style.postMain}>
        <div className={style.postImageDiv}>
          <img className={style.postImage} src={post.img} alt="" />
        </div>
        <div className={style.postDescriptionDiv}>
          <h1 className={style.postDescription}>{post.postDescription}</h1>
        </div>
      </div>
      <div className={style.postFooter}>
        <div className={style.postFooterLikes}>
          <Likesimg className={style.postLikesImg} />
          <h1 className={style.postLikes}>{post.likes}</h1> 
          <h1 className={style.postLikesText}>Likes</h1>
        </div>
        <div className={style.postFooterTags}>
          <div className={style.postTags}>
            <h1 className={style.postTagsText}>Tags:</h1>
          </div>
          <div className={style.postTagsList}>
            {post.tags.map((tag) => (
              <div key={tag.postId} className={style.postTagItem}>
                <h1 className={style.postTagText}>{tag.tagName}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}