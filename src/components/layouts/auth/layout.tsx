import { type PropsWithChildren } from 'react';
import styles from '@/styles/auth/layout.module.scss';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className={styles.authLayout}>
            <div className={styles.imageColumn}>
                <Image src="images\login_page\login_left.svg" alt="Placeholder Image" className={styles.image} fill />
            </div>
            <div className={styles.formColumn}>
                {children}
                <p className={styles.continue_text}>or continue with</p>
                <div className={styles.social_buttons_wrapper}>
                    <button className={styles.social_button} type="button">
                        <Image src="/images/login_page/facebook_logo.svg" alt="facebook" fill />
                    </button>
                    <button className={styles.social_button} type="button">
                        <Image src="/images/login_page/apple_logo.svg" alt="apple" fill />
                    </button>
                    <button
                        name="google"
                        className={styles.social_button}
                        onClick={() => void signIn('google')}
                        type="button"
                    >
                        <Image src="/images/login_page/google_logo.svg" alt="google" fill />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
