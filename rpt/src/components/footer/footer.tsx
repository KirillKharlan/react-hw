import style from "./footer.module.css";
import { ICONS } from "../../shared";
import { useLocalization } from "../../shared/context/LocalizationContext"; 

const Telegram = ICONS.telegram;
const Instagram = ICONS.instagram;
const Tiktok = ICONS.tiktok;

export function Footer() {
  const { translate } = useLocalization();

  return (
    <footer className={style.footer}>
        <div className={style.footerAuthorDiv}>
          <div className={style.footerAuthor}>
              <h1 className={style.footerAuthorText}>
                {translate("footer.author")}
              </h1>
          </div>
        </div>
        <div className={style.footerSocialNetworksDiv}>
            <div className={style.footerSocialNetworksTextDiv}>
                <h1 className={style.footerSocialNetworksText}>
                  {translate("footer.social")}
                </h1>
            </div>
            <div className={style.footerSocialNetworksIconsDiv}>
                <div className={style.footerTelegramIconDiv}>
                  <Telegram className={style.telegramIcon} />
                </div>
                <div className={style.footerInstagramIconDiv}>
                  <Instagram className={style.instagramIcon} />
                </div>
                <div className={style.footerTiktokIconDiv}>
                  <Tiktok className={style.tiktokIcon} />
                </div>
            </div>
        </div>
    </footer>
  );
}