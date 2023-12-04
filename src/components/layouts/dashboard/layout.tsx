import React, { type PropsWithChildren } from 'react';
import styles from '@/components/layouts/dashboard/layout.module.scss';
import type { NextPageWithLayout } from '@/pages/_app';
import { AuthShowcase } from '@/pages';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DashboardLayoutProps extends PropsWithChildren {}

const DashboardLayout: NextPageWithLayout<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <Link href={'/'}>Home</Link>
            </aside>
            <header className={styles.topbar}>
                <AuthShowcase />
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default DashboardLayout;
