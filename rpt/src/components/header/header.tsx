import style from "./header.module.css"
import profile from "../../images/profile.svg";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";


export function Header() {
	const isDesktop = useMediaQuery({ minWidth: 1025 });
	const isTablet = useMediaQuery({ minWidth: 750, maxWidth: 1024 });
    const isMobile = useMediaQuery({ minWidth: 300, maxWidth: 749 });


    return (
        <header className={style.header}>
            <button className={style.mainPageButton}>
                <h1 className={style.mainButtonText}>Головна</h1>
            </button>
            <button className={style.allpostsPageButton}>
                <h1 className={style.allpostsButtonText}>Усі пости</h1>
            </button>
            <button className={style.createpostButton}>
                <h1 className={style.createpostButtonText}>Створити пост</h1>
            </button>
            <div className={style.profileAndLanguageButtons}>
                <button className={style.languageButton}>
                    <h1 className={style.languageButtonText}>Мова</h1>
                </button>
                <button className={style.profileButton}>
                    <img className={style.profileImage} src={profile} alt="" />
                </button>
            </div>
        </header>
    );
}
