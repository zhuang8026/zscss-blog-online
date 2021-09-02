import React, { useCallback } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';

import { toggleTodo } from '../actions';

const VisibleTodoList = () => {
    const store = useStore();
    const dispatch = useDispatch();
    const stateData = useSelector(state => state); // 取得store 資料

    console.log(store.getState());

    const getVisibleTodos = (todos, filter) => {
        switch (filter) {
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_COMPLETED':
                return todos.filter(t => t.completed);
            case 'SHOW_ACTIVE':
                return todos.filter(t => !t.completed);
        }
    };

    // const onTodoClick = id => {
    //     dispatch(toggleTodo(id));
    // };

    // 需要透過 useCallback 的方式處理，避免掉多餘的重新渲染
    const onTodoClick = useCallback(id => dispatch({ type: 'TOGGLE_TODO', id: id }), [dispatch]);

    return (
        <ul>
            {getVisibleTodos(stateData.todos, stateData.visibilityFilter).map(todo => (
                <li
                    key={todo.id}
                    style={{
                        textDecoration: todo.completed ? 'line-through' : 'none'
                    }}
                    onClick={() => onTodoClick(todo.id)}
                >
                    {todo.text}
                </li>
            ))}
        </ul>
    );
};

export default VisibleTodoList;
