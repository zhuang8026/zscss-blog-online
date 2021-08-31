import React from 'react';
import PropTypes from 'prop-types';

// import Todo from './Todo';

// let test1 = { a: '測試1號', b: '測試2號' };
// let test2 = ['測試3號', '測試4號'];

// 方法一 推薦
// const TodoList = ({ todos, onTodoClick }) => (
//     <ul>
//         {todos.map(todo => (
//             <Todo key={todo.id} {...todo} {...test1} {...test2} onClick={() => onTodoClick(todo.id)} />
//         ))}
//     </ul>
// );

// 方法二
const TodoList = ({ todos, onTodoClick }) => (
    <ul>
        {todos.map(todo => (
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

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onTodoClick: PropTypes.func.isRequired
};

export default TodoList;
