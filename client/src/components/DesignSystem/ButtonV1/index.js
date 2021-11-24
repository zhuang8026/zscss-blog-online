import React, { createContext, useState, useContext } from 'react';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const ButtonV1 = ({ name, width = '100%' }) => {
    return (
        <button className={cx('button')} style={{ width: width }}>
            {name}
        </button>
    );
};

export default ButtonV1;
