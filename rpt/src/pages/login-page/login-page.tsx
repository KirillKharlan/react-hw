import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext'; 
import { IUserForm } from '../../shared/types';
import { useLocalization } from '../../context/LocalizationContext';
import styles from './login-page.module.css';
import { LanguageSwitcher } from '../../components/languageswitcher/languageswitcher';



type LoginFormData = Pick<IUserForm, 'email' | 'password'>;

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { translate } = useLocalization();
    const { login, loading, serverError } = useAuthContext();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    return (
        <div className={styles.authContainer}>
            <LanguageSwitcher />
            
            <form className={styles.loginForm} onSubmit={handleSubmit(login)}>
                <h1 className={styles.title}>{translate("auth.login")}</h1>

                <div className={styles.field}>
                    <label className={styles.label}>{translate("auth.email")}</label>
                    <input
                        type="email"
                        className={errors.email ? styles.inputError : styles.input}
                        {...register("email", { 
                            required: translate("auth.error_required"),
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: translate("auth.error_email")
                            }
                        })}
                    />
                    {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>{translate("auth.password")}</label>
                    <input
                        type="password"
                        className={errors.password ? styles.inputError : styles.input}
                        {...register("password", { 
                            required: translate("auth.error_required"),
                            minLength: {
                                value: 6,
                                message: translate("auth.error_password_short")
                            }
                        })}
                    />
                    {errors.password && <span className={styles.fieldError}>{errors.password.message}</span>}
                </div>

                {serverError && <div className={styles.errorText}>{serverError}</div>}

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? translate("common.loading") : translate("auth.accept")}
                </button>

                <div className={styles.footer}>
                    <span>{translate("auth.no_account")}</span>
                    <button type="button" className={styles.linkBtn} onClick={() => navigate('/register')}>
                        {translate("auth.register")}
                    </button>
                </div>
            </form>
        </div>
    );
};