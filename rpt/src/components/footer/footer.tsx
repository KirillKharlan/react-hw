import style from "./footer.module.css";
import instagram from "../../images/instagram.svg";
import tiktok from "../../images/tiktok.svg";
import telegram from "../../images/telegram.svg";



export function Footer() {
  return (
    <footer className={style.footer}>
        <div className={style.footerAuthorDiv}>
        <div className={style.footerAuthor}>
            <h1 className={style.footerAuthorText}>Автор сайту: Кирило Харлан</h1>
        </div>
        </div>
        <div className={style.footerSocialNetworksDiv}>
            <div className={style.footerSocialNetworksTextDiv}>
                <h1 className={style.footerSocialNetworksText}>Наші соцмережі</h1>
            </div>
            <div className={style.footerSocialNetworksIconsDiv}>
                <div className={style.footerTelegramIconDiv}>
                <img className={style.telegramIcon} src={telegram} alt="" />
                </div>
                <div className={style.footerInstagramIconDiv}>
                <img className={style.instagramIcon} src={instagram} alt="" />
                </div>
                <div className={style.footerTiktokIconDiv}>
                <img className={style.tiktokIcon} src={tiktok} alt="" />
                </div>
            </div>
        </div>
    </footer>
);
}