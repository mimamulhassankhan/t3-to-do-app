import { type PropsWithChildren } from 'react';
import styles from '@/styles/auth/layout.module.scss';
import Image from 'next/image';

const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className={styles.authLayout}>
            <div className={styles.imageColumn}>
                <Image src="images\login_page\login_left.svg" alt="Placeholder Image" className={styles.image} fill />
            </div>
            <div className={styles.formColumn}>{children}</div>
        </div>
    );
};

export default AuthLayout;
