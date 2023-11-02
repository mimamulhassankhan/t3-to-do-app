import InputField from '@/components/form-components/input-field';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { useRef } from 'react';
import { type NextPageWithLayout } from '../_app';
import AuthLayout from '@/components/layouts/auth/layout';
import styles from '@/styles/auth/components/login-form/login-form.module.scss';
import Link from 'next/link';

const SignInPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ csrfToken }) => {
    const loginFormFieldsRef = useRef({
        email: '',
        password: '',
    });

    console.log;
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
            <div className={styles.email_wrapper}>
                <InputField
                    label="Email"
                    name="email"
                    onInput={(e) => {
                        loginFormFieldsRef.current.email = e.currentTarget.value;
                    }}
                    placeholder="Enter your email address"
                />
            </div>
            <label>
                Password
                <input name="password" type="password" required />
            </label>
            <button type="submit">Sign in</button>
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
