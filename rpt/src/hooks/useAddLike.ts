import { useState } from "react";

export function useAddLike() {
    const [loading, setLoading] = useState<boolean>(false);

    const addLike = async (postId: number): Promise<boolean> => {
        setLoading(true);
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:8000/posts/${postId}/likes`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ""
                }
            });
            return response.ok;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { addLike, loading };
}