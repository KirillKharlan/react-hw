import React from 'react';
import { ICONS } from '../../shared';
import styles from './useravatar.module.css';

interface UserAvatarProps {
    src?: string | null;
    alt?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt}) => {
    const ProfileIcon = ICONS.profile;

    return (
        <div className={styles.avatarWrapper} >
            {src ? (
                <img 
                    src={src} 
                    alt={alt || "User"} 
                    className={styles.avatarImage} 
                />
            ) : (
                <ProfileIcon className={styles.defaultIcon} />
            )}
        </div>
    );
};