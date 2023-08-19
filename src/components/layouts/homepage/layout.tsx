import React, { type PropsWithChildren } from 'react';
import styles from '@/components/layouts/homepage/layout.module.scss';

const HomepageLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>Welcome to My Website</header>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>&copy; 2023 My Website. All rights reserved.</footer>
        </div>
    );
};

export default HomepageLayout;
