import React from 'react';
import type { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/components/layouts/dashboard/layout';
import TodoList from '@/components/to-do/list';
import { api } from '@/utils/api';
import styles from './index.module.scss';
import Link from 'next/link';
import { type Todo } from '@prisma/client';
import { useTodoContext } from '@/contexts/todo.context';

const UserDashboard: NextPageWithLayout = () => {
    const { todoAction } = useTodoContext();
    const { data: todos, isLoading } = api.todo.getAll.useQuery();
    const { mutate, isSuccess } = api.todo.deleteById.useMutation();

    function handleDelete(id: Todo['id']) {
        mutate({ id });
        if (isSuccess) todoAction({ type: 'DELETE_TODO', payload: id });
    }

    if (!todos || isLoading) {
        return <p>Loading to-do list...</p>;
    }

    return (
        <div className={styles.dashboardContainer}>
            <h1>Welcome to Your Dashboard</h1>
            <TodoList todos={todos} handleDelete={handleDelete} />
            <Link className={styles.createButton} href={`/todo/create`}>
                Create To-Do
            </Link>
        </div>
    );
};

UserDashboard.getLayout = function getLayout(page: React.ReactElement) {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default UserDashboard;
