import { createRoot } from "react-dom/client";
import { PostsPage } from "./pages/posts-page/posts-page";
import { MainPage } from "./pages/main-page/main-page";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"


const rootDiv = document.getElementById('root') as HTMLElement;
const root = createRoot(rootDiv);
export function AppRouter() {
    return (
        <StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/posts" element={<PostsPage />} />
                </Routes>   
            </BrowserRouter>
        </StrictMode>
    )
};
