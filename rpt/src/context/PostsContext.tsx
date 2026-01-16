import { createContext, ReactNode, useState, useMemo, useContext } from "react";
import { IPost } from "../shared/types";
import { usePosts } from "../hooks/usePosts";

interface IPostContext {
    posts: IPost[];
    filteredPosts: IPost[];
    inputData: string;
    setInputData: (val: string) => void;
    minLikes: number;
    setMinLikes: (val: number) => void;
    loading: boolean;
    error: string | null;
}

export const PostContext = createContext<IPostContext | null>(null);

export function PostContextProvider({ children }: { children: ReactNode }) {
    const { allPosts, loading, error } = usePosts();
    const [inputData, setInputData] = useState<string>("");
    const [minLikes, setMinLikes] = useState<number>(0);
    const filteredPosts = useMemo(() => {
        return allPosts.filter((post) => {
            const matchesSearch = post.name.toLowerCase().includes(inputData.toLowerCase());
            const matchesLikes = post.likes >= minLikes;

            return matchesSearch && matchesLikes;
        });
    }, [allPosts, inputData, minLikes]);

    const value: IPostContext = {
        posts: allPosts,
        filteredPosts,
        inputData,
        setInputData,
        minLikes,
        setMinLikes,
        loading,
        error
    };

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
}

export const usePostContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePostContext must be used within PostContextProvider");
    }
    return context;
};