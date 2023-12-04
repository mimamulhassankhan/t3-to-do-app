import type { Todo } from '@prisma/client';
import React, { createContext, useReducer, useContext, type PropsWithChildren } from 'react';
import { set } from 'lodash';

type Action =
    | { type: 'ADD_ALL'; payload: Todo[] }
    | { type: 'ADD_TODO'; payload: Todo }
    | { type: 'UPDATE_TODO'; payload: Todo }
    | { type: 'DELETE_TODO'; payload: Todo['id'] }
    | { type: 'UPDATE_FIELD'; payload: { name: string; value: string | number } }
    | { type: 'SET_SELECTED'; payload: Todo }
    | { type: 'RESET_TODO_FORM' };

interface State {
    todos: Todo[];
    selected: Todo;
}

interface TodoContextType {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const initialState = (id?: Todo['id']): State => {
    return {
        todos: [],
        selected: {
            id: id ?? '',
            title: '',
            description: '',
            done: false,
            createdAt: null,
            updatedAt: null,
        },
    };
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const todoReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_ALL':
            return { ...state, todos: action.payload };
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] };
        case 'UPDATE_TODO':
            const updatedTodos = state.todos.map((todo) => (todo.id === action.payload.id ? action.payload : todo));
            return { ...state, todos: updatedTodos };
        case 'DELETE_TODO':
            const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload);
            return { ...state, todos: filteredTodos };
        case 'UPDATE_FIELD':
            const selected = set(state.selected, action.payload.name, action.payload.value);
            return { ...state, selected };
        case 'SET_SELECTED':
            return { ...state, selected: action.payload };
        case 'RESET_TODO_FORM':
            return { ...state, selected: initialState().selected };
        default:
            return state;
    }
};

export const TodoProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(todoReducer, initialState());
    return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }

    return { todoStore: context.state, todoAction: context.dispatch };
};
