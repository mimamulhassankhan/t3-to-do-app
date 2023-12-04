import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { api } from '@/utils/api';
import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
import { TodoProvider } from '@/contexts/todo.context';

import '@/styles/globals.scss';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppType & {
    Component: NextPageWithLayout;
    pageProps: { session: Session | null };
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <SessionProvider session={session}>
            <TodoProvider>{getLayout(<Component {...pageProps} />)}</TodoProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
