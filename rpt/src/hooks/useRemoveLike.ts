import { useState } from "react";

export function useRemoveLike() {
    const [loading, setLoading] = useState<boolean>(false);

    const removeLike = async (postId: number): Promise<boolean> => {
        setLoading(true);
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:8000/posts/${postId}/likes`, {
                method: "DELETE",
                headers: {
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

    return { removeLike, loading };
}