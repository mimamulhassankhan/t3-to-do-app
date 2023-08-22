import React, { useContext, useReducer } from 'react';
import styles from '@/components/to-do/form/index.module.scss';
import { useTodoContext } from '@/contexts/todo.context';
import { type Todo } from '@prisma/client';

export interface TodoFormProps {
    handleSubmit: (todo: Todo) => Promise<void>;
    edit?: boolean;
}

const TodoForm = ({ handleSubmit, edit = false }: TodoFormProps) => {
    const {
        todoStore: { selected: todo },
        todoAction,
    } = useTodoContext();

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        todoAction({ type: 'UPDATE_FIELD', payload: { name: e.target.name, value: e.target.value } });
    };

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!handleSubmit) return;
        handleSubmit(todo)
            .then(() => {
                console.log('creted');
            })
            .catch((err) => {
                console.error(err);
            });
        // .finally(() => dispatch({ type: 'RESET' }));
    }

    console.log({ selected: todo });

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit}>
                <div className={styles['form-group']}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" value={todo.title} onInput={handleTextFieldChange} />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" value={todo.description} onInput={handleTextFieldChange} />
                </div>
                {/* <button type="reset" className={styles['reset-button']}>
                    Reset
                </button> */}
                <button type="submit" className={styles['submit-button']}>
                    {edit ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    );
};

export default TodoForm;
