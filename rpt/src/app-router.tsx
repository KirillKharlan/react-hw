import { PostsPage } from "./pages/posts-page/posts-page";
import { PostPage } from "./pages/post-page/post-page"
import { MainPage } from "./pages/main-page/main-page";
import { BrowserRouter, Route, Routes } from "react-router-dom"

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/:id" element={<PostPage />}/>
            </Routes>   
        </BrowserRouter>
    );
}