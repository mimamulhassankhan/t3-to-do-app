import InputField from '@/components/form-components/input-field';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRef } from 'react';
import { type NextPageWithLayout } from '../_app';
import AuthLayout from '@/components/layouts/auth/layout';
import Link from 'next/link';
import styles from '@/styles/auth/components/login-form/login-form.module.scss';
import Image from 'next/image';
import CheckBox from '@/components/form-components/check-box';

const SignInPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ csrfToken }) => {
    const loginFormFieldsRef = useRef({
        email: '',
        password: '',
    });

    return (
        <form className={styles.form} method="post" action="/api/auth/callback/credentials">
            <h1 className={styles.title}>Sign in</h1>
            <p className={styles.no_account_message}>If you don’t have an account register</p>
            <p className={styles.registration_message}>
                <span>You can </span>
                <Link href="/signup" className={styles.registration_link}>
                    Register here !
                </Link>
            </p>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className={styles.field_wrapper}>
                <InputField
                    label="Email"
                    name="email"
                    onInput={(e) => {
                        loginFormFieldsRef.current.email = e.currentTarget.value;
                    }}
                    placeholder="Enter your email address"
                    autoComplete="off"
                    aria-autocomplete="none"
                />
            </div>
            <div className={styles.field_wrapper}>
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    onInput={(e) => {
                        loginFormFieldsRef.current.password = e.currentTarget.value;
                    }}
                    placeholder="Enter your Password"
                    autoComplete="off"
                    aria-autocomplete="none"
                />
            </div>
            <div className={styles.remember_me_forgot_password_wrapper}>
                <CheckBox label="Remember me" name="remember_me" />
                <Link href="/forgot-password" className={styles.forgot_password_link}>
                    Forgot password?
                </Link>
            </div>

            <button className={styles.submit_button} type="submit">
                Login
            </button>
        </form>
    );
};

SignInPage.getLayout = function getLayout(page: React.ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}

export default SignInPage;
