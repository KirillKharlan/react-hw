import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import { useAuthContext } from '../../shared/context/AuthContext'; 
import { IUserForm } from '../../shared/types';
import { useLocalization } from '../../shared/context/LocalizationContext';
import styles from './login-page.module.css';



type LoginFormData = Pick<IUserForm, 'email' | 'password'>;

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { translate } = useLocalization();
    const { login: executeLogin, loading, error: serverError } = useLogin();
    const { login: saveAuth } = useAuthContext();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        const result = await executeLogin(data.email, data.password!);
        if (result && result.token) {
            saveAuth(result.token);
            navigate('/profile');
        }
    };

    return (
        <div className={styles.authContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={styles.title}>{translate("auth.login")}</h1>

                <div className={styles.field}>
                    <input
                        type="email"
                        placeholder={translate("auth.email")}
                        className={errors.email ? styles.inputError : styles.input}
                        {...register("email", { required: true })}
                    />
                </div>

                <div className={styles.field}>
                    <input
                        type="password"
                        placeholder={translate("auth.password")}
                        className={errors.password ? styles.inputError : styles.input}
                        {...register("password", { required: true })}
                    />
                </div>

                {serverError && <div className={styles.serverError}>{serverError}</div>}

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