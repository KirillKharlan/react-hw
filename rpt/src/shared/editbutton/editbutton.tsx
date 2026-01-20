import React from 'react';
import style from './editbutton.module.css';
import { useLocalization } from '../context/LocalizationContext'; 

interface EditButtonProps {
    onClick: () => void;
    className?: string;
    label?: string;
}

export const EditButton: React.FC<EditButtonProps> = ({ 
    onClick, 
    className, 
    label 
}) => {
    const { translate } = useLocalization();

    return (
        <button 
            className={`${style.editBtn} ${className || ''}`} 
            onClick={onClick}
            type="button"
        >
            {label || translate("common.edit")}
        </button>
    );
};