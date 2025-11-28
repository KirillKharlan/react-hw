import React from 'react';
import instagram from "./images/instagram.svg";
import tiktok from "./images/tiktok.svg";
import telegram from "./images/telegram.svg";
import profile from "./images/profile.svg";
import "./static/styles/App.css"
import { Posts } from './Posts';



export function App() {
  return (
    <div className="App">
      <header className="header">
        <button className="main-page-button">
          <h1 className="main-button-text">Головна Сторінка</h1>
        </button>
        <button className="allposts-page-button">
          <h1 className="allposts-button-text">Усі пости</h1>
        </button>
        <button className="createpost-page-button">
          <h1 className="createpost-button-text">Створити пост</h1>
        </button>
        <div className="profile-and-language-buttons">
          <button className="language-button">
            <h1 className="language-button-text">Мова</h1>
          </button>
          <button className="profile-button">
            <img className="profile-image" src={profile} alt="" />
          </button>
        </div>
      </header>
      <main className="main">
        <div className="technical-part-texts">
          <div className="backend-texts-div">
            <h1 className="backend-text">Tehnologies: TypeScript, Prisma, Express, Middleware, SQLite

Data Base Structure: </h1>
            <h1 className="backend-text-main">1. User: This model is central to authentication and identity. It stores all necessary credentials and information about users interacting with the platform, including their first and second names, email, avatar, hashed password, and their isAdmin status. Crucially, it tracks the posts created by the user (createdPosts) and those they have liked (likedPosts).
            2. Post: This is the main content object of the system. The model is designed to hold the core publishable content on the platform, including the title (name), body (postDescription), image URL (img), and the like count (likes). It acts as the primary point of connection for all related entities: the author (createdBy), tags (tags), and the specific category (category)
            3. Category: This model functions as a lookup dictionary for content organization. Its purpose is to classify posts into broad thematic groups, providing structural integrity and facilitating user navigation. It stores the unique category name and an optional description.
            4. Tag: This model is used for flexible classification and search. Unlike Category, tags allow multiple unique labels to be attached to a post, describing specific topics or keywords. It primarily stores the unique tag name.</h1>
          </div>
          <div className="frontend-texts-div">
            <h1 className="frontend-text"></h1>
          </div>
        </div>
        <div className="description-part-text">
          <h1 className="description-text">Project descriptoin: This project, my first written in TypeScript, is a social network where users have the following features: the ability to upload posts, search for posts, and there are also post categories and the ability to search within them. And of course, users who have registered on our site can be searched for</h1>
        </div>
      </main>
      <footer className="footer">
        <div className="footer-author-div">
          <div className="footer-author">
            <h1 className="footer-author-text">Автор сайту: Кирило Харлан</h1>
          </div>
        </div>
        <div className="footer-social-networks-div">
          <div className="footer-social-networks-text-div">
            <h1 className="footer-social-networks-text">Наші соціальні мережі</h1>
          </div>
          <div className="footer-social-networks-icons-div">
            <div className="footer-telegram-icon-div">
              <img className="telegram-icon" src={telegram} alt="" />
            </div>
            <div className="footer-instagram-icon-div">
              <img className="instagram-icon" src={instagram} alt="" />
            </div>
            <div className="footer-tiktok-icon-div">
              <img className="tiktok-icon" src={tiktok} alt="" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


