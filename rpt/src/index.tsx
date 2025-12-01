import { createRoot } from "react-dom/client";
import { App } from "./App";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { PostsPage } from "./components/postsPage/postsPage";
import { IPost, ITag } from "./components/postCard/types";


const rootDiv = document.getElementById('root') as HTMLElement;
const root = createRoot(rootDiv);
root.render(
    <StrictMode>
        <BrowserRouter>
            <PostsPage 
                posts={[] as IPost[]}
                tags={[] as ITag[]}
            />
        </BrowserRouter>
    </StrictMode>
);
// если нужен App вместо Posts, то заменить выше на <App />