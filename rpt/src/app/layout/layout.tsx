import style from "./layout.module.css";
import { Header } from "../header/header";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className={style.layout}>
            <Header />
            <main className={style.layoutContent}>
                {children}
            </main>
        </div>
    );
}