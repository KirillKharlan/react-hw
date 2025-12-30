import { useState, useEffect } from "react";
import { PostResponse, UsePostReturn } from "../pages/post-page/types"; 

export function usePost(id: string | undefined): UsePostReturn {
    const [post, setPost] = useState<PostResponse | null>(null);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            const token = localStorage.getItem("token");
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(
                    `http://localhost:8000/posts/${id}?include=comments&include=likedBy`, 
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            ...(token ? { "Authorization": `Bearer ${token}` } : {})
                        }
                    }
                );
                if (response.ok) {
                    const result: PostResponse = await response.json();
                    setPost(result);
                    setLikesCount(result.likes || 0);
                    setIsLiked(result.isLiked || false); 
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    setError(errorData.message || "Не удалось загрузить пост");
                }
            } catch (err) {
                setError("Ошибка соединения с сервером");
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    return { 
        post, 
        setPost,
        isLiked, 
        setIsLiked, 
        likesCount, 
        setLikesCount, 
        isLoading, 
        error 
    };
}