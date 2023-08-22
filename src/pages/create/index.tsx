import React, { useEffect } from 'react';
import type { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/dashboard/layout';
import { api } from '@/utils/api';

const CreatePage: NextPageWithLayout = () => {
    // const { data: todos } = api.todo.getAll.useQuery();
    const m = api.todo.createTodo.useMutation();
    useEffect(() => {
        m.mutate({ title: 'New Todo', description: 'Wow New Todo New' });
    }, []);
    return <h1>Hello From Create page</h1>;
};

CreatePage.getLayout = (page: React.ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreatePage;
