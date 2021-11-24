import React, { useState, useContext } from 'react';

import Unity, { UnityContent } from 'react-unity-webgl';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const ReactUnityWebgl = () => {
    return (
        <>
            <div className={cx('reactUnityWebgl')}>ReactUnityWebgl</div>
        </>
    );
};

export default ReactUnityWebgl;
