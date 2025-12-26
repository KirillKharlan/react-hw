import React from 'react';
import style from './editbutton.module.css';

interface EditButtonProps {
    onClick: () => void;
    className?: string;
    label?: string;
}

export const EditButton: React.FC<EditButtonProps> = ({ 
    onClick, 
    className, 
    label = "Редагувати" 
}) => {
    return (
        <button 
            className={`${style.editBtn} ${className || ''}`} 
            onClick={onClick}
            type="button"
        >
            {label}
        </button>
    );
};