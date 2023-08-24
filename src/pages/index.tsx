import styles from './index.module.scss';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import type { NextPageWithLayout } from './_app';
import HomepageLayout from '@/components/layouts/homepage/layout';
import { useRouter } from 'next/router';

function AuthShowcase() {
    const router = useRouter();
    const { data: sessionData } = useSession();

    // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    //     undefined, // no input
    //     { enabled: sessionData?.user !== undefined }
    // );

    return (
        <div className={styles.authContainer}>
            <p className={styles.showcaseText}>
                {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
                {/* {secretMessage && <span> - {secretMessage}</span>} */}
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
            <button
                className={styles.loginButton}
                hidden={Boolean(sessionData)}
                onClick={() => void router.push('/signup')}
            >
                Sign Up
            </button>
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
                <AuthShowcase />
                {/* <Link href="login" className={styles.main}>
                    Get Started
                </Link> */}
            </main>
        </>
    );
};

Home.getLayout = (page: React.ReactElement) => {
    return <HomepageLayout>{page}</HomepageLayout>;
};

export default Home;
