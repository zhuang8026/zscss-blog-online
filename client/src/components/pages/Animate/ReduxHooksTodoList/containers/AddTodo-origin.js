import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

// import { addTodo } from '../actions';

let AddTodo = props => {
    // const { dispatch } = props;
    let input;
    let nextTodoId = 0;

    const dispatch = useDispatch();

    // const todos = useSelector(state => state);
    // console.log('todos:', todos);

    const boundAddTodo = e => {
        e.preventDefault();
        if (!input.value.trim()) {
            return;
        }

        console.log('input number:', input.value);

        // dispatch(addTodo(input.value)); // action (使用者動作)

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

AddTodo = connect()(AddTodo); // 這裡是 重點！使用 connect 才會有 dispatch fun

export default AddTodo;
