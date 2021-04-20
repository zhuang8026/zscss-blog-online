import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { getBooleanFromENV } from 'components/utils';

import './style_module.scss';

const NavLeft = () => {
    return (
        <nav>
            <ul>
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
            </ul>
        </nav>
    );
};

export default NavLeft;
