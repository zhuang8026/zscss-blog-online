import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// Context
import { AdminContext } from 'contexts/admin';

// components
import Cards from './Cards';
import Info from './Info';
import Rating from './Rating';
import NavLeft from 'components/DesignSystem/NavLeft';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Backend = ({ history }) => {
    return (
        <div className={cx('backend')}>
            <NavLeft />
            <div className={cx('body')}>
                <Info />
                <Rating />
                <Cards />
            </div>
        </div>
    );
};

export default withRouter(Backend);
