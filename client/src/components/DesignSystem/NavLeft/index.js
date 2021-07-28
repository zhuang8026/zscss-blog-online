import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { getBooleanFromENV } from 'components/utils';

// css
// import classNames from 'classnames/bind';
// import classes from './style_module.scss';
// const cx = classNames.bind(classes);

import styles from './styles.module.scss';
import cx from 'classnames';

const NavLeft = ({ type = 'success' }) => {
    return (
        <nav>
            <ul className={cx(styles.nav_ul)}>
                <li>
                    <Link to={'/'}>
                        <span>JavaScript</span>
                        <img src={require(`images/Home/zscss.png`)} alt="home" />
                    </Link>
                </li>
                {getBooleanFromENV('REACT_APP_IS_JAVA_OPEN', false) ? (
                    <li>
                        <Link to={'/animate'}>
                            <span>Animate</span>
                            <img src={require(`images/Home/zscss.png`)} alt="vue" />
                        </Link>
                    </li>
                ) : (
                    <></>
                )}

                <li>
                    <span>come soon</span>
                    <img src={require(`images/Home/zscss.png`)} alt="react" />
                </li>
                <li>
                    <span>come soon</span>
                    <img src={require(`images/Home/zscss.png`)} alt="php" />
                </li>
                <li>
                    <span>come soon</span>
                    <img src={require(`images/Home/zscss.png`)} alt="mysql" />
                </li>
                <li
                    className={cx({
                        [styles.success]: type === 'success',
                        [styles.error]: type === 'error'
                    })}
                />
            </ul>
        </nav>
    );
};

export default NavLeft;
