import style from './postsList.module.css';
import { PostCard } from '../postCard/postCard';
import { usePostContext } from '../../context/PostsContext'; 

export function PostsList() {
    const { filteredPosts } = usePostContext();

    return (
        <div className={style.posts}>
            {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}