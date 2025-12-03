import style from "./mainPage.module.css";
import { Header } from "../header/header"
import { Footer } from "../footer/footer";

export function MainPage() {
    return (
        <div>
            <Header></Header>
            <main className={style.main}>
                <div className={style.techicalPartTexts}>
                <div className={style.backendTextsDiv}>
                    <h1 className={style.backendText}>Tehnologies: TypeScript, Prisma, Express, Middleware, SQLite

        Data Base Structure: </h1>
                    <h1 className={style.backendTextMain}>1. User: This model is central to authentication and identity. It stores all necessary credentials and information about users interacting with the platform, including their first and second names, email, avatar, hashed password, and their isAdmin status. Crucially, it tracks the posts created by the user (createdPosts) and those they have liked (likedPosts).
                    <br />
                    2. Post: This is the main content object of the system. The model is designed to hold the core publishable content on the platform, including the title (name), body (postDescription), image URL (img), and the like count (likes). It acts as the primary point of connection for all related entities: the author (createdBy), tags (tags), and the specific category (category)
                    <br />
                    3. Category: This model functions as a lookup dictionary for content organization. Its purpose is to classify posts into broad thematic groups, providing structural integrity and facilitating user navigation. It stores the unique category name and an optional description.
                    <br />
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
            <Footer></Footer>
        </div>
  );
}  