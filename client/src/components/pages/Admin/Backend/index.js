import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// Context
import { AdminContext } from 'contexts/admin';

// DesignSystem
import { FullWindowAnimateStorage } from 'components/DesignSystem/FullWindow';
import NavTop from 'components/DesignSystem/NavTop';

// components
import NavLeft from 'components/DesignSystem/NavLeft';
import TableItems from './TableItems';
import CreateItems from './CreateItems';
import EditItems from './EditItems';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Backend = ({ history }) => {
    const { closeAnimate, openAnimate } = useContext(FullWindowAnimateStorage);

    const openCreate = () => {
        openAnimate({
            component: <CreateItems />
        });
    };

    const openEdit = (penId, reset) => {
        openAnimate({
            component: <EditItems penId={penId} reset={reset}/>
        });
    };

    return (
        <div className={cx('backend')}>
            <NavLeft />
            <div className={cx('body')}>
                <NavTop openCreate={openCreate} />
                <TableItems openEdit={openEdit} />
            </div>
        </div>
    );
};

export default withRouter(Backend);
