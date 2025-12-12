import { createRoot } from "react-dom/client";
import { Posts } from "./App";
import { MainPage } from "./components/mainPage/mainPage";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"


const rootDiv = document.getElementById('root') as HTMLElement;
const root = createRoot(rootDiv);
root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/posts" element={<Posts />} />
            </Routes>   
        </BrowserRouter>
    </StrictMode>
);

