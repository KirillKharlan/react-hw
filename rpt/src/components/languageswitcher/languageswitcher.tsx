import { useState } from "react";
import { useLocalization } from "../../context/LocalizationContext";
import { Modal } from "../../shared/modal/modal";
import headerStyle from "../../app/header/header.module.css";
import authStyles from "./languageswitcher.module.css";

export function LanguageSwitcher() {
    const { locale, setLocale, translate } = useLocalization();
    const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);

    const handleLanguageChange = (newLocale: 'en' | 'uk' | 'es') => {
        setLocale(newLocale);
        setIsLangModalOpen(false);
    };

    return (
        <div className={authStyles.wrapper}>
            <button 
                type="button"
                className={headerStyle.languageButton} 
                onClick={() => setIsLangModalOpen(true)}
            >
                {locale === 'uk' ? 'UA' : locale.toUpperCase()}
            </button>

            <Modal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)}>
                <div className={headerStyle.langModalContent}>
                    <h2 className={headerStyle.langModalTitle}>{translate("header.language")}</h2>
                    <div className={headerStyle.langOptions}>
                        {(['uk', 'en', 'es'] as const).map((lang) => (
                            <button 
                                key={lang}
                                className={`${headerStyle.langOption} ${locale === lang ? headerStyle.activeLang : ''}`}
                                onClick={() => handleLanguageChange(lang)}
                            >
                                {lang === 'uk' ? 'Українська (UA)' : lang === 'en' ? 'English (EN)' : 'Español (ES)'}
                            </button>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
}