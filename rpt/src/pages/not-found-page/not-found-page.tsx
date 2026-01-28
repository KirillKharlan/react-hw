import { useNavigate } from "react-router-dom";
import styles from "./not-found-page.module.css";

export function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.errorCode}>404</h1>
            <p className={styles.message}>Упс! Сторінку, яку ви шукаєте, не знайдено.</p>
            <button className={styles.backBtn} onClick={() => navigate("/")}>
                Повернутися на головну
            </button>
        </div>
    );
}