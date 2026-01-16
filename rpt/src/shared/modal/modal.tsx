import { createPortal } from "react-dom";
import { useEffect, useRef, ReactNode } from "react";
import styles from "./modal.module.css";

interface IModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    doCloseOnOutsideClick?: boolean;
    className?: string;
}

export function Modal(props: IModalProps) {
    const { 
        children, 
        className = "", 
        isOpen, 
        onClose, 
        doCloseOnOutsideClick = true 
    } = props;

    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";
        function handleClickOutside(event: MouseEvent) {
            if (overlayRef.current && overlayRef.current === event.target) {
                onClose();
            }
        }
        function handleEsc(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        if (doCloseOnOutsideClick) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.body.style.overflow = originalStyle;
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose, doCloseOnOutsideClick]);
    if (!isOpen) return null;

    return createPortal(
        <div className={styles.fixedOverlay} ref={overlayRef}>
            <div className={`${styles.modalContent} ${className}`}>
                <button 
                    className={styles.closeButton} 
                    onClick={onClose}
                    aria-label="Закрити модальне вікно"
                >
                    &times;
                </button>
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}