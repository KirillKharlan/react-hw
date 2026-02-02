import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./header.module.css";
import { Modal } from "../../shared/modal/modal"; 
import { CreatePostForm } from "../../components/createpostform/createpostfrom";
import { useLocalization } from "../../context/LocalizationContext";
import { useAuthContext } from "../../context/AuthContext";
import { UserAvatar } from "../../shared/useravatar/useravatar";


type LocaleType = 'en' | 'uk' | 'es' | 'de' | 'fr' | 'pl' | 'pt';

interface IHeaderUser {
    firstName: string;
    avatar?: string | null;
}

export function Header() {
    const navigate = useNavigate();
    const { isAuth } = useAuthContext();
    const { locale, setLocale, translate } = useLocalization();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);
    const [user] = useState<IHeaderUser | null>(null);

    const handleLanguageChange = (newLocale: LocaleType) => {
        setLocale(newLocale);
        setIsLangModalOpen(false);
    };

    const languages: { code: LocaleType; label: string; name: string }[] = [
        { code: 'uk', label: 'UA', name: 'Українська' },
        { code: 'en', label: 'EN', name: 'English' },
        { code: 'es', label: 'ES', name: 'Español' },
        { code: 'de', label: 'DE', name: 'Deutsch' },
        { code: 'fr', label: 'FR', name: 'Français' },
        { code: 'pl', label: 'PL', name: 'Polski' },
        { code: 'pt', label: 'PT', name: 'Português' },
    ];

    return (
        <header className={style.header}>
            <div className={style.navGroup}>
                <button className={style.mainPageButton} onClick={() => navigate("/")}>
                    <h1 className={style.mainButtonText}>{translate("header.home")}</h1>
                </button>
                <button className={style.allpostsPageButton} onClick={() => navigate("/posts")}>
                    <h1 className={style.allpostsButtonText}>{translate("header.all_posts")}</h1>
                </button>
                {isAuth && (
                    <button className={style.createpostButton} onClick={() => setIsModalOpen(true)}>
                        <h1 className={style.createpostButtonText}>{translate("header.create_post")}</h1>
                    </button>
                )}
            </div>
            
            <div className={style.profileAndLanguageButtons}>
                <div className={style.languageWrapper}>
                    <button className={style.languageButton} onClick={() => setIsLangModalOpen(true)}>
                        <span className={style.languageButtonText}>
                            {locale === 'uk' ? 'UA' : locale.toUpperCase()}
                        </span>
                    </button>
                </div>

                {isAuth ? (
                    <button className={style.profileButton} onClick={() => navigate("/profile")}>
                        <UserAvatar src={user?.avatar} alt={user?.firstName} />
                    </button>
                ) : (
                    <button className={style.loginBtn} onClick={() => navigate("/login")}>
                        <span className={style.loginBtnText}>{translate("auth.login")}</span>
                    </button>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CreatePostForm onSuccess={() => setIsModalOpen(false)} />
            </Modal>

            <Modal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)}>
                <div className={style.langModalContent}>
                    <h2 className={style.langModalTitle}>{translate("header.language")}</h2>
                    <div className={style.langOptions}>
                        {languages.map((lang) => (
                            <button 
                                key={lang.code}
                                className={`${style.langOption} ${locale === lang.code ? style.activeLang : ''}`}
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                {lang.name} ({lang.label})
                            </button>
                        ))}
                    </div>
                </div>
            </Modal>
        </header>
    );
}