import DashboardLayout from '@/components/layouts/dashboard/layout';
import TodoForm from '@/components/to-do/form';
import { useTodoContext } from '@/contexts/todo.context';
import type { NextPageWithLayout } from '@/pages/_app';
import { api } from '@/utils/api';
import type { Todo } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface TodoEditPageProps {
    todo: Todo;
}

const TodoEditPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { todoAction } = useTodoContext();
    const { query } = useRouter();
    const { data: todo, isLoading } = api.todo.getById.useQuery({ id: String(query?.id) });
    const { mutateAsync } = api.todo.update.useMutation();

    function handleSubmit(todo: Todo) {
        mutateAsync(todo)
            .then(() => {
                todoAction({ type: 'RESET_TODO_FORM' });
                void router.replace('/dashboard');
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        if (todo) todoAction({ type: 'SET_SELECTED', payload: todo });
    }, [todo, todoAction]);

    return isLoading ? <h1>Loading.....</h1> : <TodoForm handleSubmit={handleSubmit} edit />;
};

TodoEditPage.getLayout = function getLaout(page: React.ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default TodoEditPage;
