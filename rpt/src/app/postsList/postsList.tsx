import style from './postsList.module.css';
import { IProps } from './types';
import { PostCard } from '../postCard/postCard';

export function PostsList(props: IProps) {
    return (
        <div className={style.posts}>
            {props.posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
}