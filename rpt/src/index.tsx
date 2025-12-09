import { createRoot } from "react-dom/client";
import { Posts } from "./App";
import { MainPage } from "./components/mainPage/mainPage";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";


const rootDiv = document.getElementById('root') as HTMLElement;
const root = createRoot(rootDiv);
root.render(
    <StrictMode>
        <BrowserRouter>
            <Posts />
            {/* <MainPage /> */}
        </BrowserRouter>
    </StrictMode>
);
