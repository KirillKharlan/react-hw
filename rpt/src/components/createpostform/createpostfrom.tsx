import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../hooks/useCreatePost";
import style from "./createpostform.module.css";
import { useLocalization } from "../../context/LocalizationContext";

export function CreatePostForm({ onSuccess }: { onSuccess: () => void }) {
    const navigate = useNavigate();
    const { createPost, isLoading, error } = useCreatePost();
    const { translate } = useLocalization();
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await createPost({ name, postDescription: description, img });
        if (result?.id) { onSuccess(); navigate(`/posts/${result.id}`); }
    };

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <h2 className={style.title}>{translate("form.create_title")}</h2>
            <input 
                className={style.input} 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder={translate("form.title_placeholder")} 
                required 
            />
            <textarea 
                className={style.textarea} 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder={translate("form.desc_placeholder")} 
                required 
            />
            <input 
                className={style.input} 
                type="url" 
                value={img} 
                onChange={(e) => setImg(e.target.value)} 
                placeholder="URL (https://...)" 
                required 
            />
            <button type="submit" className={style.submitBtn} disabled={isLoading}>
                {isLoading ? translate("form.submitting") : translate("form.submit")}
            </button>
        </form>
    );
}