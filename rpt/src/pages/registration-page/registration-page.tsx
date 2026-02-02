import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { IUserForm } from '../../shared/types';
import { useLocalization } from '../../context/LocalizationContext';
import { LanguageSwitcher } from '../../components/languageswitcher/languageswitcher';
import styles from './registration-page.module.css';



export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { translate } = useLocalization();
    const { signUp, loading, serverError } = useAuthContext();

    const { register, handleSubmit, formState: { errors } } = useForm<IUserForm>();

    const onSubmit = async (data: IUserForm) => {
        const cleanData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== "")
        ) as IUserForm;

        await signUp(cleanData);
        
        if (!serverError) {
            navigate('/profile');
        }
    };

    return (
        <div className={styles.authContainer}>
            <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
                <LanguageSwitcher />
                <h1 className={styles.title}>{translate("auth.register")}</h1>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="firstName">
                        {translate("auth.firstname")}
                    </label>
                    <input 
                        id="firstName"
                        autoComplete="given-name"
                        className={errors.firstName ? styles.inputError : styles.input} 
                        placeholder={translate("auth.firstname")}
                        {...register("firstName", { required: true })} 
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="secondName">
                        {translate("auth.secondname")} ({translate("common.optional")})
                    </label>
                    <input 
                        id="secondName"
                        autoComplete="family-name"
                        className={styles.input} 
                        placeholder={translate("auth.secondname")}
                        {...register("secondName")} 
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">
                        {translate("auth.email")}
                    </label>
                    <input 
                        id="email"
                        type="email" 
                        autoComplete="email"
                        className={errors.email ? styles.inputError : styles.input} 
                        placeholder={translate("auth.email")}
                        {...register("email", { required: true })} 
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="password">
                        {translate("auth.password")}
                    </label>
                    <input 
                        id="password"
                        type="password" 
                        autoComplete="new-password"
                        className={errors.password ? styles.inputError : styles.input} 
                        placeholder={translate("auth.password")}
                        {...register("password", { required: true, minLength: 6 })} 
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>
                        {translate("auth.avatar")} ({translate("common.optional")})
                    </label>
                    <input 
                        className={styles.input} 
                        placeholder={translate("auth.avatar")}
                        {...register("avatar")} 
                    />
                </div>

                {serverError && <div className={styles.errorText}>{serverError}</div>}

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? translate("common.loading") : translate("auth.accept")}
                </button>

                <div className={styles.footer}>
                    <span>{translate("auth.have_account")}</span>
                    <button type="button" className={styles.linkBtn} onClick={() => navigate('/login')}>
                        {translate("auth.login")}
                    </button>
                </div>
            </form>
        </div>
    );
};