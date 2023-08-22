import React, { useEffect } from 'react';
import type { NextPageWithLayout } from '../../_app';
import DashboardLayout from '@/components/layouts/dashboard/layout';
import { api } from '@/utils/api';
import TodoForm from '@/components/to-do/form';

const CreatePage: NextPageWithLayout = () => {
    const m = api.todo.createTodo.useMutation();

    return (
        <TodoForm
            handleSubmit={async (todo) => {
                try {
                    m.mutate(todo);
                    return Promise.resolve();
                } catch (err) {
                    console.error(err);
                    return Promise.reject(err);
                }
            }}
        />
    );
};

CreatePage.getLayout = (page: React.ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreatePage;
