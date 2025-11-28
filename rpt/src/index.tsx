import { createRoot } from "react-dom/client";
import { StrictMode } from 'react';
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

const rootDiv = document.getElementById('root') as HTMLElement;

const root = createRoot(rootDiv);
root.render(
    <StrictMode>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </StrictMode>
)
