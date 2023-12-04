import { type Todo } from '@prisma/client';
import Link from 'next/link';
import styles from './index.module.scss';

export interface TodoListProps {
    todos: Todo[];
    handleDelete?: (id: Todo['id']) => void;
}

const TodoList = ({ todos, handleDelete }: TodoListProps) => {
    return (
        <table className={styles.todoTable}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => (
                    <tr key={todo.id}>
                        <td>{todo.title}</td>
                        <td>
                            <Link role="button" className={styles.editLink} href={`/todo/edit/${todo.id}`}>
                                Edit
                            </Link>
                        </td>
                        <td>
                            <button
                                type="button"
                                className={styles.deleteButton}
                                onClick={() => {
                                    if (handleDelete) handleDelete(todo.id);
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TodoList;
