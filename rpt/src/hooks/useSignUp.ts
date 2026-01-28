import { useState } from "react";
import { IUserForm } from '../shared'; 

interface JsonWebToken {
    token: string;
}

export function useSignUp() {
    const url = "http://localhost:8000/register";
    const [data, setData] = useState<JsonWebToken | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const signUp = async (userData: IUserForm) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData || "Registration failed");
            }

            setData(responseData as JsonWebToken);
            
            if (responseData.token) {
                localStorage.setItem("token", responseData.token);
            }
            
            return responseData;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { signUp, data, error, loading };
}