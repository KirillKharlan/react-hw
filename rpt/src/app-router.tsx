import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { MainPage } from "./pages/main-page/main-page";
import { PostsPage } from "./pages/posts-page/posts-page";
import { PostPage } from "./pages/post-page/post-page";
import { LoginPage } from "./pages/login-page/login-page";
import { RegisterPage } from "./pages/registration-page/registration-page";
import { ProfilePage } from "./pages/profile-page/profile-page";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { useAuthContext } from "./context/AuthContext";


export function AppRouter() {
    const { isAuth } = useAuthContext();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/:id" element={<PostPage />} />
                
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route 
                    path="/profile" 
                    element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} 
                />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>   
        </BrowserRouter>
    );
}