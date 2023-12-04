import React from 'react';
import type { NextPageWithLayout } from '../../_app';
import DashboardLayout from '@/components/layouts/dashboard/layout';
import { api } from '@/utils/api';
import TodoForm from '@/components/to-do/form';
import { useRouter } from 'next/router';
import { useTodoContext } from '@/contexts/todo.context';

const CreatePage: NextPageWithLayout = () => {
    const router = useRouter();
    const { todoAction } = useTodoContext();
    const { mutateAsync } = api.todo.createTodo.useMutation();

    return (
        <TodoForm
            handleSubmit={(todo) => {
                mutateAsync({ title: todo.title, description: todo.description })
                    .then(() => {
                        void router.replace('/dashboard');
                    })
                    .catch((err) => console.error(err))
                    .finally(() => {
                        todoAction({ type: 'RESET_TODO_FORM' });
                    });
            }}
        />
    );
};

CreatePage.getLayout = (page: React.ReactElement) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreatePage;
