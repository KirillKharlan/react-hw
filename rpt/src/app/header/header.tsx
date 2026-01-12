import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "./header.module.css";
import { ICONS } from "../../shared";
import { Modal } from "../../shared/modal/modal"; 
import { CreatePostForm } from "../../components/createpostform/createpostfrom"; 



const Profile = ICONS.profile;

export function Header() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const buttonContainerRef = useRef<HTMLDivElement>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <header className={style.header}>
            <button className={style.mainPageButton} onClick={() => navigate("/")}>
                <h1 className={style.mainButtonText}>Головна</h1>
            </button>
            
            <button className={style.allpostsPageButton} onClick={() => navigate("/posts")}>
                <h1 className={style.allpostsButtonText}>Усі пости</h1>
            </button>
            <div className={style.createPostWrapper} ref={buttonContainerRef}>
                <button className={style.createpostButton} onClick={openModal}>
                    <h1 className={style.createpostButtonText}>Створити пост</h1>
                </button>

                <Modal 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    doCloseOnOutsideClick={true}
                    container={buttonContainerRef.current || document.body}
                >
                    <CreatePostForm onSuccess={closeModal} />
                </Modal>
            </div>
            
            <div className={style.profileAndLanguageButtons}>
                <button className={style.languageButton}>
                    <h1 className={style.languageButtonText}>Мова</h1>
                </button>
                <button className={style.profileButton} onClick={() => navigate("/profile")}>
                    <Profile className={style.profileImage} />
                </button>
            </div>
        </header>
    );
}