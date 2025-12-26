import { useState } from "react";
import { IComment } from "../app/postCard/types" 

export function usePostActions() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const token = localStorage.getItem('token');

    const likePost = async (postId: number): Promise<boolean> => {
        try {
            const response = await fetch(`http://localhost:8000/posts/${postId}/like`, {
                method: 'POST',
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    };

    const unlikePost = async (postId: number): Promise<boolean> => {
        try {
            const response = await fetch(`http://localhost:8000/posts/${postId}/like`, {
                method: 'DELETE',
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    };

    const addComment = async (postId: number, body: string): Promise<IComment | null> => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`http://localhost:8000/posts/${postId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ body }),
            });
            if (!response.ok) return null;
            return await response.json();
        } catch (error) {
            return null;
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteComment = async (postId: number, commentId: number) => {
        if (!token) return false;

        try {
            const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.ok;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    return { likePost, unlikePost, addComment, deleteComment, isSubmitting };
}