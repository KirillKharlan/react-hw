import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

import { ICONS } from "../../shared";
import { EditButton } from "../../shared/editbutton/editbutton";
import { usePost } from "../../hooks/usePost";
import { usePostActions } from "../../hooks/usePostActions";
import { useAddLike } from "../../hooks/useAddLike"; 
import { useRemoveLike } from "../../hooks/useRemoveLike";
import { CommentWithAuthor } from "./types";
import style from "./post-page.module.css";

const Likesimg = ICONS.likesimg;

export function PostPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [commentText, setCommentText] = useState<string>("");
    const [showToolbar, setShowToolbar] = useState<boolean>(false);
    
    const { 
        post, 
        setPost,
        likesCount, 
        setLikesCount, 
        isLiked, 
        setIsLiked, 
        isLoading, 
        error 
    } = usePost(id);

    const { addComment, deleteComment, isSubmitting } = usePostActions();
    const { addLike, loading: addLoading } = useAddLike();
    const { removeLike, loading: removeLoading } = useRemoveLike();

    const modules = {
        toolbar: {
            container: "#toolbar",
        },
    };

    const handleLikeToggle = async () => {
        if (!post || addLoading || removeLoading) return;

        if (isLiked) {
            const success = await removeLike(post.id);
            if (success) {
                setLikesCount((prev) => prev - 1);
                setIsLiked(false);
            }
        } else {
            const success = await addLike(post.id);
            if (success) {
                setLikesCount((prev) => prev + 1);
                setIsLiked(true);
            }
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post) return;;
        const plainText = commentText.replace(/<(.|\n)*?>/g, '').trim();
        if (!plainText) return;
        const newComment = await addComment(post.id, commentText) as CommentWithAuthor;
        if (newComment) {
            setPost({
                ...post,
                comments: [newComment, ...(post.comments || [])]
            });
            setCommentText(""); 
            setShowToolbar(false);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        if (!post || !window.confirm("Видалити цей коментар?")) return;
        
        const success = await deleteComment(post.id, commentId);
        if (success) {
            setPost({
                ...post,
                comments: post.comments?.filter(c => c.id !== commentId) || []
            });
        }
    };

    if (isLoading) return <div className={style.loader}>Завантаження...</div>;
    
    if (error || !post) {
        return (
            <div className={style.errorContainer}>
                <h2>Помилка</h2>
                <p>{error || "Пост не знайдено"}</p>
                <button onClick={() => navigate('/')}>На головну</button>
            </div>
        );
    }

    return (
        <div className={style.postCard}>
            <div className={style.postHeader}>
                <h1 className={style.postHeaderText}>{post.name}</h1> 
                <EditButton 
                    onClick={() => console.log("Edit")} 
                    className={style.headerEditBtn}
                />
            </div>
            
            <div className={style.postMain}>
                <div className={style.postImageDiv}>
                    <img className={style.postImage} src={post.img} alt={post.name} />
                </div>
                <div className={style.postDescriptionDiv}>
                    <div 
                        className={style.postDescription}
                        dangerouslySetInnerHTML={{ __html: post.postDescription }} 
                    />
                    {post.createdAt && (
                        <p className={style.postDate}>
                            Створено: {new Date(post.createdAt).toLocaleDateString('uk-UA')}
                        </p>
                    )}
                </div>
            </div>
            
            <div className={style.postFooter}>
                <div 
                    className={`${style.postFooterLikes} ${isLiked ? style.activeLike : ''}`} 
                    onClick={handleLikeToggle}
                >
                    <Likesimg className={style.postLikesImg} />
                    <span className={style.postLikesCount}>
                        {addLoading || removeLoading ? "..." : `${likesCount} Likes`}
                    </span>
                </div>
                
                <div className={style.postFooterTags}>
                    <span className={style.tagsLabel}>Теги:</span>
                    <div className={style.postTagsList}>
                        {post.tags?.map((tag) => (
                            <span key={tag.id} className={style.tagItem}>#{tag.tagName}</span>
                        ))}
                    </div>
                </div>
            </div>
    
            <div className={style.commentsSection}>
                <h3 className={style.commentsTitle}>Коментарі ({post.comments?.length || 0})</h3>
                
                <form className={style.commentForm} onSubmit={handleCommentSubmit}>
                    <div className={style.editorWrapper}>
                        <div 
                            id="toolbar" 
                            className={`${style.customToolbar} ${showToolbar ? style.visible : style.hidden}`}
                        >
                            <span className="ql-formats">
                                <button className="ql-bold"></button>
                                <button className="ql-italic"></button>
                                <button className="ql-underline"></button>
                            </span>
                        </div>

                        <div className={style.editorContainer}>
                            <div 
                                className={`${style.fontIcon} ${showToolbar ? style.activeIcon : ''}`} 
                                onClick={() => setShowToolbar(!showToolbar)}
                            >
                                Aa
                            </div>
                            <div className={style.quillWrapper}>
                                <ReactQuill 
                                    theme="snow" 
                                    value={commentText} 
                                    onChange={setCommentText}
                                    modules={modules}
                                    placeholder="Написати коментар..."
                                />
                            </div>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className={style.submitBtn}
                        disabled={isSubmitting}
                    >
                        OK
                    </button>
                </form>
    
                <div className={style.commentsList}>
                    {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <div key={comment.id} className={style.commentItem}>
                                <div className={style.commentHeader}>
                                    <div className={style.authorInfo}>
                                        <strong className={style.commentAuthor}>
                                            {comment.author?.firstName} {comment.author?.secondName}
                                        </strong>
                                        {comment.createdAt && (
                                            <span className={style.commentDate}>
                                                {new Date(comment.createdAt).toLocaleDateString('uk-UA')}
                                            </span>
                                        )}
                                    </div>
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
                        ))
                    ) : (
                        <p className={style.noComments}>Будьте першим, хто прокоментує!</p>
                    )}
                </div>
            </div>
        </div>
    );
}