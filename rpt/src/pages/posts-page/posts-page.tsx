import { useState, useEffect } from "react";
import style from "./posts-page.module.css";
import { IPost, ITag } from "../../shared/types";
import { Filter } from "../../components/filter/filter";
import { PostsList } from "../../app/postsList";
import { Layout } from "../../app/layout/layout";


export const tagsList: ITag[] = [
    { id: 0, name: "#Programming" },
    { id: 1, name: "#Typescript" },
    { id: 2, name: "#React" }
];

export function PostsPage() {
    const [allPosts, setAllPosts] = useState<IPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchPosts() {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:8000/posts");
                
                if (!response.ok) {
                    throw new Error("Не вдалося завантажити пости");
                }

                const data: IPost[] = await response.json();
                
                setAllPosts(data);
                setFilteredPosts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Помилка сервера");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (loading) return <Layout><div>Завантаження...</div></Layout>;
    if (error) return <Layout><div>Помилка: {error}</div></Layout>;

    return (
        <Layout>
            <div className={style.postPage}>
                <div className={style.postsPageContent}>
                    <Filter 
                        tags={tagsList} 
                        allPosts={allPosts} 
                        setFilteredPosts={setFilteredPosts} 
                    />
                    
                    <div className={style.resultsContainer}>
                        <h2 className={style.countText}>
                            Знайдено постів: {filteredPosts.length}
                        </h2>
                        <PostsList posts={filteredPosts} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}