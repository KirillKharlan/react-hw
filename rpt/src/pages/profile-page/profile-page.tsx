import React, { useState } from 'react';
import { PostCard } from '../../app/postCard'; 
import { useProfile } from '../../hooks/useUserInfo';
import styles from './profile-page.module.css';
import { Modal } from "../../shared/modal/modal"; 
import { CreatePostForm } from "../../components/createpostform/createpostfrom";
import { EditProfileForm } from "../../components/edituserform/edituserform";
import { useLocalization } from "../../context/LocalizationContext";
import { Header } from "../../app/header/header";
import { UserAvatar } from "../../shared/useravatar/useravatar";



export const ProfilePage: React.FC = () => {
    const { user, loading, refresh } = useProfile();
    const { translate } = useLocalization();
    
    const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'likes'>('posts');
    const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    if (loading) return <div className={styles.loader}>{translate("common.loading")}</div>;
    if (!user) return <div className={styles.errorContainer}>User not found</div>;

    const hasContent = 
        (activeTab === 'posts' && user.createdPosts.length > 0) ||
        (activeTab === 'comments' && user.comments.length > 0) ||
        (activeTab === 'likes' && user.likedPosts.length > 0);

    const getEmptyStateMessage = () => {
        switch (activeTab) {
            case 'posts': 
                return translate("profile.no_posts_yet");
            case 'comments': 
                return translate("profile.no_comments_yet");
            case 'likes': 
                return translate("profile.no_likes_yet");
        }
    };

    return (
        <>
            <Header /> 

            <div className={styles.profileContainer}>
                <div className={styles.contentWrapper}>
                    <div className={styles.header}>
                        <div className={styles.avatarCircle}>
                            <UserAvatar src={user.avatar || undefined} alt={user.firstName} />
                        </div>
                        <div className={styles.usernameDisplay}>
                            {user.firstName} {user.secondName}
                        </div>
                    </div>

                    <div className={styles.actionButtons}>
                        <button 
                            className={styles.blueBtn} 
                            onClick={() => setIsEditModalOpen(true)}
                        >
                            {translate("profile.edit")}
                        </button>
                        
                        <button 
                            className={styles.blueBtn} 
                            onClick={() => setIsPostModalOpen(true)}
                        >
                            {translate("header.create_post")}
                        </button>
                    </div>

                    <div className={styles.tabs}>
                        {(['posts', 'comments', 'likes'] as const).map((tab) => (
                            <button 
                                key={tab}
                                className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {translate(`profile.${tab}`)}
                            </button>
                        ))}
                    </div>

                    <div className={styles.contentList}>
                        {!hasContent ? (
                            <div className={styles.descriptionText}>
                                {getEmptyStateMessage()}
                            </div>
                        ) : (
                            <div className={styles.postsGrid}>
                                {activeTab === 'posts' && user.createdPosts.map(post => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                                {activeTab === 'comments' && user.comments.map(comm => (
                                    <div key={comm.id} className={styles.commentCard}>
                                        <div className={styles.commentHeader}>
                                            <span>{new Date(comm.createdAt).toLocaleDateString()}</span>
                                            <a href={`/post/${comm.postId}`} className={styles.postLink}>
                                                {translate("profile.view_post")}
                                            </a>
                                        </div>
                                        <div className={styles.commentBody}>
                                            {comm.body}
                                        </div>
                                    </div>
                                ))}
                                {activeTab === 'likes' && user.likedPosts.map(like => (
                                    <PostCard key={like.postId} post={like.post} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <Modal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)}>
                    <CreatePostForm onSuccess={() => setIsPostModalOpen(false)} />
                </Modal>

                <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                    <EditProfileForm 
                        user={user} 
                        onSuccess={() => {
                            setIsEditModalOpen(false);
                            refresh();
                        }} 
                    />
                </Modal>
            </div>
        </>
    );
};