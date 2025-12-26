import { useState, useEffect } from "react";
import { IPost } from "../shared/types";

export function usePosts() {
    const [allPosts, setAllPosts] = useState<IPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPosts() {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:8000/posts", {
                    signal: controller.signal
                });
                
                if (!response.ok) {
                    throw new Error(`Помилка: ${response.status} ${response.statusText}`);
                }

                const data: IPost[] = await response.json();
                
                setAllPosts(data);
                setFilteredPosts(data);
                setError(null); 
            } catch (err: unknown) {
                if (err instanceof Error && err.name === 'AbortError') return;
                
                const errorMessage = err instanceof Error ? err.message : "Помилка сервера";
                setError(errorMessage);
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }
        
        fetchPosts();
        return () => controller.abort();
    }, []);

    return { 
        allPosts, 
        filteredPosts, 
        setFilteredPosts, 
        loading, 
        error 
    };
}