import style from "./header.module.css"
import { ICONS } from "../../shared";

const Profile = ICONS.profile;
export function Header() {
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
                    <Profile className={style.profileImage} />
                </button>
            </div>
        </header>
    );
}
