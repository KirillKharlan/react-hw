import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IUserProfile } from '../../shared/types';
import { useLocalization } from '../../context/LocalizationContext';
import styles from './edituserform.module.css';

interface EditProfileProps {
    user: IUserProfile;
    onSuccess: () => void;
}

type EditFormData = Pick<IUserProfile, 'firstName' | 'secondName' | 'avatar'>;

export const EditProfileForm: React.FC<EditProfileProps> = ({ user, onSuccess }) => {
    const { translate } = useLocalization();
    const [serverError, setServerError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<EditFormData>({
        defaultValues: {
            firstName: user.firstName,
            secondName: user.secondName,
            avatar: user.avatar ?? undefined
        }
    });

    const onSubmit = async (data: EditFormData): Promise<void> => {
    setServerError(null);
    setIsSubmitting(true);
    try {
        const response = await fetch("http://localhost:8000/update", {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Помилка оновлення");
        }

        onSuccess();
    } catch (e) {
        setServerError(e instanceof Error ? e.message : "Network error");
    } finally {
        setIsSubmitting(false);
    }
};

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.title}>{translate("profile.edit")}</h2>

            <div className={styles.field}>
                <label className={styles.label}>{translate("auth.firstname")}</label>
                <input
                    className={errors.firstName ? styles.inputError : styles.input}
                    placeholder={translate("auth.firstname")}
                    {...register("firstName", { required: true })}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>
                    {translate("auth.secondname")} ({translate("common.optional")})
                </label>
                <input
                    className={styles.input}
                    placeholder={translate("auth.secondname")}
                    {...register("secondName")}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>{translate("auth.avatar")}</label>
                <input
                    className={styles.input}
                    placeholder={translate("auth.avatar")}
                    {...register("avatar")}
                />
            </div>

            {serverError && <div className={styles.errorText}>{serverError}</div>}

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? translate("common.loading") : translate("auth.accept")}
            </button>
        </form>
    );
};