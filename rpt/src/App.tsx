import React from 'react';
import instagram from "./images/instagram.svg";
import tiktok from "./images/tiktok.svg";
import telegram from "./images/telegram.svg";
import profile from "./images/profile.svg";
import style from "./static/styles/App.module.css";


export function App() {
  return (
    <div className={style.App}>
      <header className={style.header}>
        <button className={style.mainPageButton}>
          <h1 className={style.MainButtonText}>Головна Сторінка</h1>
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
      <main className={style.main}>
        <div className={style.techicalPartTexts}>
          <div className={style.backendTextsDiv}>
            <h1 className={style.backendText}>Tehnologies: TypeScript, Prisma, Express, Middleware, SQLite

Data Base Structure: </h1>
            <h1 className={style.backendTextMain}>1. User: This model is central to authentication and identity. It stores all necessary credentials and information about users interacting with the platform, including their first and second names, email, avatar, hashed password, and their isAdmin status. Crucially, it tracks the posts created by the user (createdPosts) and those they have liked (likedPosts).
            2. Post: This is the main content object of the system. The model is designed to hold the core publishable content on the platform, including the title (name), body (postDescription), image URL (img), and the like count (likes). It acts as the primary point of connection for all related entities: the author (createdBy), tags (tags), and the specific category (category)
            3. Category: This model functions as a lookup dictionary for content organization. Its purpose is to classify posts into broad thematic groups, providing structural integrity and facilitating user navigation. It stores the unique category name and an optional description.
            4. Tag: This model is used for flexible classification and search. Unlike Category, tags allow multiple unique labels to be attached to a post, describing specific topics or keywords. It primarily stores the unique tag name.</h1>
          </div>
          <div className={style.frontendTextsDiv}>
            <h1 className={style.frontendText}></h1>
          </div>
        </div>
        <div className={style.descriptionPartText}>
          <h1 className={style.descriptionText}>Project descriptoin: This project, my first written in TypeScript, is a social network where users have the following features: the ability to upload posts, search for posts, and there are also post categories and the ability to search within them. And of course, users who have registered on our site can be searched for</h1>
        </div>
      </main>
      <footer className={style.footer}>
        <div className={style.footerAuthorDiv}>
          <div className={style.footerAuthor}>
            <h1 className={style.footerAuthorText}>Автор сайту: Кирило Харлан</h1>
          </div>
        </div>
        <div className={style.footerSocialNetworksDiv}>
          <div className={style.footerSocialNetworksTextDiv}>
            <h1 className={style.footerSocialNetworksText}>Наші соціальні мережі</h1>
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
    </div>
  );
}
