import styles from './index.module.scss';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <Head>
                <title>To-do App</title>
                <meta name="description" content="Developed by Imamul Hassan" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Link href="create" className={styles.main}>
                    Create New To-do
                </Link>
            </main>
        </>
    );
}

// function AuthShowcase() {
//     const { data: sessionData } = useSession();

//     const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//         undefined, // no input
//         { enabled: sessionData?.user !== undefined }
//     );

//     return (
//         <div className={styles.authContainer}>
//             <p className={styles.showcaseText}>
//                 {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//                 {secretMessage && <span> - {secretMessage}</span>}
//             </p>
//             <button className={styles.loginButton} onClick={sessionData ? () => void signOut() : () => void signIn()}>
//                 {sessionData ? 'Sign out' : 'Sign in'}
//             </button>
//         </div>
//     );
// }
