import { createRoot } from "react-dom/client";
import { StrictMode } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Posts } from "./posts";
import { IPost, ITag } from "./types"; 


const MOCK_TAGS: ITag[] = [
    { id: 1, name: 'TypeScript' },
    { id: 2, name: 'React' },
];
const MOCK_PRODUCTS: IPost[] = [
    { 
        id: 101, 
        title: 'Тестовый пост 1', 
        description: 'Это длинное тестовое описание первого поста, которое нужно обрезать.', 
        image: 'https://via.placeholder.com/150', 
        userId: 1, 
        tags: [MOCK_TAGS[0], MOCK_TAGS[1]] 
    },
    { 
        id: 102, 
        title: 'Тестовый пост 2', 
        description: 'Второе описание, немного короче.', 
        image: 'https://via.placeholder.com/150', 
        userId: 2, 
        tags: [MOCK_TAGS[1]] 
    }
];


const rootDiv = document.getElementById('root') as HTMLElement;
const root = createRoot(rootDiv);
root.render(
    <StrictMode>
        <BrowserRouter>
            <Posts 
                products={MOCK_PRODUCTS} 
                tags={MOCK_TAGS}
            />
        </BrowserRouter>
    </StrictMode>
);
// если нужен App вместо Posts, то заменить выше на <App />