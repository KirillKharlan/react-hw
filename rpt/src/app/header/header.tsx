import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./header.module.css";
import { ICONS } from "../../shared";
import { Modal } from "../../shared/modal/modal"; 
import { CreatePostForm } from "../../components/createpostform/createpostfrom";
import { useLocalization } from "../../shared/context/LocalizationContext";


const Profile = ICONS.profile;

export function Header() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { locale, setLocale, translate } = useLocalization();

    const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);

    const handleLanguageChange = (newLocale: 'en' | 'uk' | 'es') => {
        setLocale(newLocale);
        setIsLangModalOpen(false);
    };

    return (
        <header className={style.header}>
            <button className={style.mainPageButton} onClick={() => navigate("/")}>
                <h1 className={style.mainButtonText}>{translate("header.home")}</h1>
            </button>
            
            <button className={style.allpostsPageButton} onClick={() => navigate("/posts")}>
                <h1 className={style.allpostsButtonText}>{translate("header.all_posts")}</h1>
            </button>
            
            <button className={style.createpostButton} onClick={() => setIsModalOpen(true)}>
                <h1 className={style.createpostButtonText}>{translate("header.create_post")}</h1>
            </button>
            
            <div className={style.profileAndLanguageButtons}>
                <div className={style.languageWrapper}>
                    <button 
                        className={style.languageButton} 
                        onClick={() => setIsLangModalOpen(true)}
                    >
                        {locale === 'uk' ? 'UA' : locale.toUpperCase()}
                    </button>
                </div>
                <button className={style.profileButton} onClick={() => navigate("/profile")}>
                    <Profile className={style.profileImage} />
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CreatePostForm onSuccess={() => setIsModalOpen(false)} />
            </Modal>

            <Modal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)}>
                <div className={style.langModalContent}>
                    <h2 className={style.langModalTitle}>{translate("header.language")}</h2>
                    <div className={style.langOptions}>
                        <button 
                            className={`${style.langOption} ${locale === 'uk' ? style.activeLang : ''}`}
                            onClick={() => handleLanguageChange('uk')}
                        >
                            Українська (UA)
                        </button>
                        <button 
                            className={`${style.langOption} ${locale === 'en' ? style.activeLang : ''}`}
                            onClick={() => handleLanguageChange('en')}
                        >
                            English (EN)
                        </button>
                        <button 
                            className={`${style.langOption} ${locale === 'es' ? style.activeLang : ''}`}
                            onClick={() => handleLanguageChange('es')}
                        >
                            Español (ES)
                        </button>
                    </div>
                </div>
            </Modal>
        </header>
    );
}