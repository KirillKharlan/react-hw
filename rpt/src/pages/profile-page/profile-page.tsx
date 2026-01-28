import React, { useState } from 'react';
import { PostCard } from '../../app/postCard'; 
import { useProfile } from '../../hooks/useUserInfo';
import styles from './profile-page.module.css';
import { Modal } from "../../shared/modal/modal"; 
import { CreatePostForm } from "../../components/createpostform/createpostfrom";
import { useLocalization } from "../../shared/context/LocalizationContext";
import { Header } from "../../app/header/header";

export const ProfilePage: React.FC = () => {
    const { user, loading } = useProfile();
    const { translate } = useLocalization();
    const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'likes'>('posts');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    if (loading) return <div className={styles.profileContainer}>Loading...</div>;
    if (!user) return <div className={styles.profileContainer}>User not found</div>;

    const hasContent = 
        (activeTab === 'posts' && user.createdPosts.length > 0) ||
        (activeTab === 'comments' && user.comments.length > 0) ||
        (activeTab === 'likes' && user.likedPosts.length > 0);

    return (
        <>
            <Header /> 

            <div className={styles.profileContainer}>
                <div className={styles.contentWrapper}>
                    <div className={styles.header}>
                        <div className={styles.avatarCircle}>
                            {user.avatar ? <img src={user.avatar} className={styles.avatarImg} alt="avatar" /> : "Avatar"}
                        </div>
                        <div className={styles.usernameDisplay}>{user.firstName}</div>
                    </div>

                    <div className={styles.actionButtons}>
                        <button className={styles.blueBtn}>
                            {translate("profile.edit")}
                        </button>
                        
                        <button 
                            className={styles.blueBtn} 
                            onClick={() => setIsModalOpen(true)}
                        >
                            {translate("header.create_post")}
                        </button>
                    </div>

                    <div className={styles.tabs}>
                        <button 
                            className={`${styles.tabBtn} ${activeTab === 'posts' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('posts')}
                        >
                            {translate("profile.posts")}
                        </button>
                        <button 
                            className={`${styles.tabBtn} ${activeTab === 'comments' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('comments')}
                        >
                            {translate("profile.comments")}
                        </button>
                        <button 
                            className={`${styles.tabBtn} ${activeTab === 'likes' ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab('likes')}
                        >
                            {translate("profile.likes")}
                        </button>
                    </div>

                    <div className={styles.contentList}>
                        {!hasContent ? (
                            <div className={styles.descriptionText}>
                                Тут буде список ваших {activeTab === 'posts' ? 'постів' : activeTab === 'comments' ? 'коментарів' : 'лайків'}.{"\n"}
                                Коли ви їх додасте, вони з'являться тут.
                            </div>
                        ) : (
                            <div className={styles.postsGrid}>
                                {activeTab === 'posts' && user.createdPosts.map(post => <PostCard key={post.id} post={post} />)}
                                {activeTab === 'comments' && user.comments.map(comm => <div key={comm.id}>{comm.body}</div>)}
                                {activeTab === 'likes' && user.likedPosts.map(like => <PostCard key={like.postId} post={like.post} />)}
                            </div>
                        )}
                    </div>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <CreatePostForm onSuccess={() => setIsModalOpen(false)} />
                </Modal>
            </div>
        </>
    );
};
