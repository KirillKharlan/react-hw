import React, { useState } from 'react';
import { ICONS } from "../../shared";
import { IPropsPostCard, IComment } from './types'; 
import style from "./postCard.module.css";
import { usePostActions } from "../../hooks/usePostActions";

const Likesimg = ICONS.likesimg;

export function PostCard({ post }: IPropsPostCard) { 
  const [likesCount, setLikesCount] = useState<number>(post.likes);
  const [commentText, setCommentText] = useState<string>("");
  const [localComments, setLocalComments] = useState<IComment[]>(post.comments || []);
  
  const { likePost, addComment, deleteComment, isSubmitting } = usePostActions();

  const handleLikeClick = async (): Promise<void> => {
    const success = await likePost(post.id);
    if (success) setLikesCount(prev => prev + 1);
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const savedText = commentText;
    setCommentText(""); 

    const newComment = await addComment(post.id, savedText);
    if (newComment) {
      setLocalComments(prev => [newComment, ...prev]);
    }
  };

  const handleDeleteComment = async (commentId: number): Promise<void> => {
    if (window.confirm("Ви впевнені, що хочете видалити коментар?")) {
      await deleteComment(post.id, commentId);
    }
  };

  return (
    <div className={style.postCard}>
      <div className={style.postHeader}>
        <h1 className={style.postHeaderText}>{post.name}</h1> 
      </div>
      
      <div className={style.postMain}>
        <div className={style.postImageDiv}>
          <img className={style.postImage} src={post.img} alt={post.name} />
        </div>
        <div className={style.postDescriptionDiv}>
          <h1 className={style.postDescription}>{post.postDescription}</h1>
        </div>
      </div>
      
      <div className={style.postFooter}>
        <div className={style.postFooterLikes} onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
          <Likesimg className={style.postLikesImg} />
          <h1 className={style.postLikes}>{likesCount}</h1> 
          <h1 className={style.postLikesText}>Likes</h1>
        </div>
        
        <div className={style.postFooterTags}>
          <div className={style.postTagsList}>
            {post.tags?.map((tag) => (
              <div key={`${tag.postId}-${tag.tagName}`} className={style.postTagItem}>
                <h1 className={style.postTagText}>{tag.tagName}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={style.commentsSection}>
        <form className={style.commentInputGroup} onSubmit={handleCommentSubmit}>
          <input 
            type="text" 
            className={style.commentInput}
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value)}
          />
          <button 
            type="submit" 
            className={style.commentButton}
            disabled={isSubmitting || !commentText.trim()}
          >
            {isSubmitting ? "..." : "OK"}
          </button>
        </form>

        <div className={style.commentsList}>
          {localComments.map((comment) => (
            <div key={comment.id} className={style.commentItem}>
              <div className={style.commentHeader}>
                <span className={style.commentAuthor}>
                  {comment.author.firstName} {comment.author.secondName}:
                </span>
                <button 
                  className={style.deleteCommentBtn} 
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  ×
                </button>
              </div>
              <span className={style.commentBody}>{comment.body}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}