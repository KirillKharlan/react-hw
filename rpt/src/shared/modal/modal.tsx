import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { IModalProps } from "./modal.types";
import styles from "./modal.module.css";

export function Modal(props: IModalProps) {
    const { 
        children, 
        className = "", 
        isOpen, 
        onClose, 
        doCloseOnOutsideClick = false,
        container = document.body 
    } = props;

    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!doCloseOnOutsideClick || !isOpen) return;

        function clickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (overlayRef.current && overlayRef.current === target) {
                onClose();
            }
        }

        document.addEventListener("mousedown", clickOutside);
        return () => document.removeEventListener("mousedown", clickOutside);
    }, [isOpen, onClose, doCloseOnOutsideClick]);

    if (!isOpen) return null;

    const isInsideElement = container !== document.body;

    return createPortal(
        <div 
            className={`${isInsideElement ? styles.relativeOverlay : styles.fixedOverlay} ${className}`} 
            ref={overlayRef}
        >
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                {children}
            </div>
        </div>,
        container
    );
}