import style from "./posts-page.module.css";
import { ITag } from "../../shared/types";
import { Filter } from "../../components/filter/filter";
import { PostsList } from "../../app/postsList";
import { Layout } from "../../app/layout/layout";
import { usePosts } from "../../hooks/usePosts";


export const tagsList: ITag[] = [
    { id: 0, name: "#Programming" },
    { id: 1, name: "#Typescript" },
    { id: 2, name: "#React" }
];

export function PostsPage() {
    const { allPosts, filteredPosts, setFilteredPosts, loading, error } = usePosts();

    if (loading) {
        return (
            <Layout>
                <div className={style.loader}>Завантаження постів...</div>
            </Layout>
        );
    }

    if (error) {
        return <Layout><div>Помилка: {error}</div></Layout>;
    }

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