import { useState } from "react";
import { IResponse } from "../shared"; 

export function useLogin() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string): Promise<IResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(typeof result === "string" ? result : "Помилка авторизації");
            }

            localStorage.setItem("token", result.token);
            return result as IResponse;
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Невідома помилка";
            setError(msg);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}