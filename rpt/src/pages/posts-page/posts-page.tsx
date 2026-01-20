import style from "./posts-page.module.css";
import { ITag } from "../../shared/types";
import { Filter } from "../../components/filter/filter";
import { PostsList } from "../../app/postsList";
import { Layout } from "../../app/layout/layout";
import { PostContextProvider, usePostContext } from "../../context/PostsContext";
import { useLocalization } from "../../shared/context/LocalizationContext"; 

export const tagsList: ITag[] = [
    { id: 0, name: "#Programming" },
    { id: 1, name: "#Typescript" },
    { id: 2, name: "#React" }
];

function PostsPageContent() {
    const { filteredPosts, loading, error } = usePostContext();
    const { translate } = useLocalization();

    if (loading) {
        return <div className={style.loader}>{translate("common.loading")}</div>;
    }

    if (error) {
        return <div>{translate("common.error")}: {error}</div>;
    }

    return (
        <div className={style.postPage}>
            <div className={style.postsPageContent}>
                <Filter tags={tagsList} /> 
                
                <div className={style.resultsContainer}>
                    <h2 className={style.countText}>
                        {translate("posts.found_count", { count: filteredPosts.length })}
                    </h2>
                    <PostsList />
                </div>
            </div>
        </div>
    );
}

export function PostsPage() {
    return (
        <Layout>
            <PostContextProvider>
                <PostsPageContent />
            </PostContextProvider>
        </Layout>
    );
}