import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../hooks/useSignUp';
import { useAuthContext } from '../../shared/context/AuthContext';
import { IUserForm } from '../../shared/types';
import { useLocalization } from '../../shared/context/LocalizationContext';
import styles from './registration-page.module.css';

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { translate } = useLocalization();
    const { signUp, loading, error: serverError } = useSignUp();
    const { login: saveAuth } = useAuthContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserForm>();

    const onSubmit = async (data: IUserForm) => {
        const result = await signUp(data);
        if (result && result.token) {
            saveAuth(result.token);
            navigate('/profile');
        }
    };

    return (
        <div className={styles.authContainer}>
            <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={styles.title}>{translate("auth.register")}</h1>

                <div className={styles.field}>
                    <input 
                        className={errors.firstName ? styles.inputError : styles.input} 
                        placeholder={translate("auth.firstname")} 
                        {...register("firstName", { required: true })} 
                    />
                </div>

                <div className={styles.field}>
                    <input 
                        className={errors.secondName ? styles.inputError : styles.input} 
                        placeholder={translate("auth.secondname")} 
                        {...register("secondName", { required: true })} 
                    />
                </div>

                <div className={styles.field}>
                    <input 
                        type="email" 
                        className={errors.email ? styles.inputError : styles.input} 
                        placeholder={translate("auth.email")} 
                        {...register("email", { required: true })} 
                    />
                </div>

                <div className={styles.field}>
                    <input 
                        type="password" 
                        className={errors.password ? styles.inputError : styles.input} 
                        placeholder={translate("auth.password")} 
                        {...register("password", { required: true, minLength: 6 })} 
                    />
                </div>

                <div className={styles.field}>
                    <input 
                        className={styles.input} 
                        placeholder={translate("auth.avatar")} 
                        {...register("avatar")} 
                    />
                </div>

                {serverError && <div className={styles.serverError}>{serverError}</div>}

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