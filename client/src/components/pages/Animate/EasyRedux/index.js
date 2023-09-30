import React, { useState, useContext } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';

// DesignSystem
import ButtonV1 from 'components/DesignSystem/ButtonV1';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const EasyRedux = () => {
    let count = useSelector(state => {
        console.log('useSelector:', state);
        return state.userReducer.count
    });
    // 用 useDispatch 產生 dispatch 方法
    const dispatch = useDispatch();
    const add = () => {
        count++;
        dispatch({
            type: 'SET_ADD_COUNT',
            count: count
        });
    };

    const edit = () => {
        count--;
        dispatch({
            type: 'SET_DELETE_COUNT',
            count: count
        });
    };

    return (
        <div className={cx('easyRedux')}>
            <div
                className={cx('btn')}
                onClick={() => {add()}}
            >
                <ButtonV1 name={'+'} />
            </div>

            <h1>{count}</h1>

            <div
                className={cx('btn')}
                onClick={() => {edit()}}
            >
                <ButtonV1 name={'-'} />
            </div>
        </div>
    );
};

export default EasyRedux;
