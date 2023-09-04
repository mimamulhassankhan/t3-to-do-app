import styles from './index.module.scss';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import type { NextPageWithLayout } from './_app';
import HomepageLayout from '@/components/layouts/homepage/layout';
import { useRouter } from 'next/router';

export function AuthShowcase() {
    const { data: sessionData } = useSession();

    return (
        <div className={styles.authContainer}>
            <p className={styles.showcaseText}>
                {sessionData && <Link href={`/dashboard`}>Logged in as {sessionData.user?.name}</Link>}
            </p>
            <button
                className={styles.loginButton}
                onClick={
                    sessionData
                        ? () => void signOut()
                        : () =>
                              void signIn('credentials', {
                                  callbackUrl: '/dashboard',
                              })
                }
            >
                {sessionData ? 'Sign out' : 'Sign in'}
            </button>
            <Link href={`/signup`} hidden={Boolean(sessionData)}>
                Sign Up
            </Link>
        </div>
    );
}

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>To-do App</title>
                <meta name="description" content="Developed by Imamul Hassan" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1>Welcome to My Website</h1>
            </main>
        </>
    );
};

Home.getLayout = (page: React.ReactElement) => {
    return <HomepageLayout>{page}</HomepageLayout>;
};

export default Home;
