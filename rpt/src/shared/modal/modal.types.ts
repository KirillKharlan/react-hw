import { ReactNode, CSSProperties } from "react";

export interface IModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    doCloseOnOutsideClick: boolean;
    container?: HTMLElement;
    className?: string;
}