import React from 'react';
import { useDispatch } from 'react-redux';

let AddTodo = () => {
    let input;
    let nextTodoId = 0;

    const dispatch = useDispatch();

    const boundAddTodo = e => {
        e.preventDefault();
        if (!input.value.trim()) {
            return;
        }

        console.log('input number:', input.value);

        dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: input.value
        }); // 此行為是 action,使用者有了動作,且送會送到 reducers 中
        // 一般這種行為都應該放在 action

        input.value = '';
    };

    return (
        <div>
            <form onSubmit={e => boundAddTodo(e)}>
                <input
                    ref={node => {
                        input = node;
                    }}
                />
                <button type="submit">Add Todo/Submit</button>
            </form>
        </div>
    );
};

export default AddTodo;
