import React from 'react';
import type { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/dashboard/layout';

const CreatePage: NextPageWithLayout = () => {
    return <h1>Hello From Create page</h1>;
};

CreatePage.getLayout = (page: React.ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreatePage;
