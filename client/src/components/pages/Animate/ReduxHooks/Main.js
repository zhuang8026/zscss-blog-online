import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Main = () => {
    const [listName, setListName] = useState('');
    const todoList = useSelector(state => state.todoList);

    // 用 useDispatch 產生 dispatch 方法
    const dispatch = useDispatch();
    const addTodoList = () => {
        // 用法一樣
        dispatch({
            type: 'ADD_TODOLIST',
            payload: { listName }
        });
    };

    return (
        <div className={cx('main')}>
            <input
                value={listName}
                onChange={e => {
                    setListName(e.target.value);
                }}
            />
            <button type="button" onClick={addTodoList}>
                增加待辦事項
            </button>
            <ul>
                {todoList.map(todo => (
                    <li key={todo}>{`-> ${todo}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default Main;
