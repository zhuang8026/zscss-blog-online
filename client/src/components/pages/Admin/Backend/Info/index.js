import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// Context
import { AdminContext } from 'contexts/admin';

// DesignSystem
import ButtonV1 from 'components/DesignSystem/ButtonV1';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Info = ({ history }) => {
    return (
        <div className={cx('info')}>
            <div className={cx('info_inner')}>
                <ButtonV1 name="新增" width="100px" />
                <ButtonV1 name="查詢" width="100px" />
            </div>
        </div>
    );
};

export default withRouter(Info);
