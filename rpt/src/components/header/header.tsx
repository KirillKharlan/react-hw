import style from "./header.module.css"
import profile from "../../images/profile.svg";


export function Header() {
    return (
        <header className={style.header}>
            <button className={style.mainPageButton}>
                <h1 className={style.mainButtonText}>Головна Сторінка</h1>
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
