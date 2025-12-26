import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import { ICONS } from "../../shared";
import { EditButton } from '../../shared/editbutton/editbutton';
import { usePostActions } from "../../hooks/usePostActions";
import { IPost, IComment } from './types'; 
import style from "./post-page.module.css";

const Likesimg = ICONS.likesimg;

const modules = {
    toolbar: [
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean']
    ],
};

export function PostPage() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<IPost | null>(null);
    const [likesCount, setLikesCount] = useState<number>(0);
    const [commentText, setCommentText] = useState<string>("");
    const [localComments, setLocalComments] = useState<IComment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const { likePost, addComment, deleteComment, isSubmitting } = usePostActions();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:8000/posts/${id}?include=comments&include=likedBy`);
                const result = await response.json();
                
                if (response.ok) {
                    setPost(result);
                    setLikesCount(result.likes || 0);
                    setLocalComments(result.comments || []);
                }
            } catch (error) {
                console.error("Помилка завантаження поста:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchPost();
    }, [id]);

    const handleLikeClick = async () => {
        if (!post) return;
        const success = await likePost(post.id);
        if (success) setLikesCount(prev => prev + 1);
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post) return;

        const plainText = commentText.replace(/<(.|\n)*?>/g, '').trim();
        if (!plainText) return;

        const newComment = await addComment(post.id, commentText);
        if (newComment) {
            setLocalComments(prev => [newComment, ...prev]);
            setCommentText(""); 
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        if (!post) return;
        if (window.confirm("Видалити коментар?")) {
            const success = await deleteComment(post.id, commentId);
            if (success) {
                setLocalComments(prev => prev.filter(c => c.id !== commentId));
            }
        }
    };

    if (isLoading) return <div className={style.loader}>Завантаження...</div>;
    if (!post) return <div className={style.error}>Пост не знайдено</div>;

    return (
        <div className={style.postCard}>
            <div className={style.postHeader}>
                <h1 className={style.postHeaderText}>{post.name}</h1> 
                <EditButton 
                    onClick={() => console.log("Edit post", post.id)} 
                    className={style.headerEditBtn}
                />
            </div>
            
            <div className={style.postMain}>
                <div className={style.postImageDiv}>
                    <img className={style.postImage} src={post.img} alt={post.name} />
                </div>
                <div className={style.postDescriptionDiv}>
                    <div className={style.postDescription}>
                        {post.postDescription}
                    </div>
                </div>
            </div>
            
            <div className={style.postFooter}>
                <div className={style.postFooterLikes} onClick={handleLikeClick}>
                    <Likesimg className={style.postLikesImg} />
                    <span className={style.postLikesCount}>{likesCount} Likes</span>
                </div>
                
                <div className={style.postFooterTags}>
                    <span className={style.tagsLabel}>Tags:</span>
                    <div className={style.postTagsList}>
                        {post.tags?.map((tag) => (
                            <span key={tag.tagName} className={style.tagItem}>#{tag.tagName}</span>
                        ))}
                    </div>
                </div>
            </div>
    
            <div className={style.commentsSection}>
                <h3 className={style.commentsTitle}>Comments</h3>
                
                <form className={style.commentForm} onSubmit={handleCommentSubmit}>
                    <div className={style.editorContainer}>
                        <div className={style.fontIcon}>Aa</div>
                        <div className={style.quillWrapper}>
                            <ReactQuill 
                                theme="snow" 
                                value={commentText} 
                                onChange={setCommentText}
                                modules={modules}
                                placeholder="Write a comment..."
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className={style.submitBtn}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "..." : "OK"}
                    </button>
                </form>
    
                <div className={style.commentsList}>
                    {localComments.map((comment) => (
                        <div key={comment.id} className={style.commentItem}>
                            <div className={style.commentHeader}>
                                <strong className={style.commentAuthor}>
                                    {comment.author?.firstName} {comment.author?.secondName}
                                </strong>
                                <button 
                                    className={style.deleteCommentBtn} 
                                    onClick={() => handleDeleteComment(comment.id)}
                                >
                                    ×
                                </button>
                            </div>
                            <div 
                                className={style.commentBody} 
                                dangerouslySetInnerHTML={{ __html: comment.body }} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}