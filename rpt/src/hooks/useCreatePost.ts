import { useState } from "react";


interface CreatePostFields {
    name: string;
    postDescription: string;
    img: string;
}

interface CreatePostResponse {
    id: number;
    name: string;
    postDescription: string;
    img: string;
    createdAt: string;
    authorId: number;
}

interface ApiError {
    message: string;
}

export function useCreatePost() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createPost = async (data: CreatePostFields): Promise<CreatePostResponse | null> => {
        const token = localStorage.getItem("token");
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:8000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorData: ApiError = await response.json().catch(() => ({ 
                    message: "Сталася непередбачувана помилка" 
                }));
                throw new Error(errorData.message);
            }
            const result: CreatePostResponse = await response.json();
            return result;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Невідома помилка");
            }
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { createPost, isLoading, error };
}