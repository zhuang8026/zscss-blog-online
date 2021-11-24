import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// Context
import { AdminContext } from 'contexts/admin';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Cards = ({ history }) => {
    return <div className={cx('cards')}>Cards</div>;
};

export default withRouter(Cards);
