import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../hooks/useCreatePost";
import style from "./createpostform.module.css";

interface CreatePostFormProps {
    onSuccess: () => void;
}

export function CreatePostForm({ onSuccess }: CreatePostFormProps) {
    const navigate = useNavigate();
    const { createPost, isLoading, error } = useCreatePost();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [img, setImg] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim() || !description.trim() || !img.trim()) return;
        const result = await createPost({ 
            name, 
            postDescription: description, 
            img 
        });
        if (result && result.id) {
            onSuccess(); 
            navigate(`/posts/${result.id}`); 
        }
    };
    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <h2 className={style.title}>Створити пост</h2>
            {error && <div className={style.errorMessage}>{error}</div>}
            <div className={style.inputGroup}>
                {/* <label htmlFor="postName" className={style.label}>Заголовок</label> */}
                <input 
                    id="postName"
                    type="text" 
                    className={style.input}
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    placeholder="Заголовок поста"
                />
            </div>
            <div className={style.inputGroup}>
                {/* <label htmlFor="postDesc" className={style.label}>Опис</label> */}
                <textarea 
                    id="postDesc"
                    className={style.textarea}
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required 
                    placeholder="Опис поста"
                />
            </div>
            <div className={style.inputGroup}>
                {/* <label htmlFor="postImg" className={style.label}>Посилання на зображення</label> */}
                <input 
                    id="postImg"
                    type="url" 
                    className={style.input}
                    value={img} 
                    onChange={(e) => setImg(e.target.value)} 
                    required 
                    placeholder="https://example.com/image.jpg"
                />
            </div>
            <div className={style.actions}>
                <button 
                    type="submit" 
                    className={style.submitBtn} 
                    disabled={isLoading}
                >
                    {isLoading ? "Надсилання..." : "Створити"}
                </button>
            </div>
        </form>
    );
}