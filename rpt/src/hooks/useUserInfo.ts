import { useState, useEffect } from "react";
import { IUserProfile } from "../shared/types";

export function useProfile() {
    const [user, setUser] = useState<IUserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMe = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:8000/me", {
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("token")}` 
                }
            });

            if (!response.ok) {
                throw new Error("Не вдалося завантажити профіль");
            }

            const data = await response.json();
            
            setUser(data as IUserProfile);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Помилка мережі");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    return { user, loading, error, refresh: fetchMe };
}