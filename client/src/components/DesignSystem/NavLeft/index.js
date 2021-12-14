import React, { useState, useEffect, useRe, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd icon
import { UserOutlined, DisconnectOutlined } from '@ant-design/icons';

// utils
import { getBooleanFromENV } from 'components/utils';

// Context
import { AdminContext } from 'contexts/admin';
import { popWindowStorage } from 'components/DesignSystem/PopWindow';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const NavLeft = ({ type = 'success', history }) => {
    const { adminData, unsetLoggedInMember } = useContext(AdminContext);
    const { openOrompt } = useContext(popWindowStorage);

    const prompt = () => {
        openOrompt({
            state: 'info',
            title: 'Sign out',
            desc: 'Are you sure sign out for admin interface ?',

            button: [
                {
                    name: 'Yes',
                    callback: unsetLoggedInMember //
                },
                { name: 'No' }
            ]
        });
    };

    const goToBackend = () => {
        history.push({
            pathname: `/admin/backend`
        });
    };

    return (
        <nav>
            <ul className={cx('nav_ul')}>
                <li>
                    <Link to={'/'}>
                        <span>FrameWork</span>
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
                        ['success']: type === 'success',
                        ['error']: type === 'error'
                    })}
                />
            </ul>

            {adminData.length > 0 && adminData[0].all.loginStatus ? (
                <div className={cx('admin_data')}>
                    <div className={cx('nav_avatar', 'btn_bottom')}>
                        {!adminData[0]?.all.userimg ? (
                            <img src={require(`images/Home/null_img.png`)} alt="avatar" />
                        ) : (
                            <img src={require(`images/admin/${adminData[0]?.all.userimg}`)} alt="avatar" />
                        )}
                    </div>
                    <div className={cx('admin_list')}>
                        <div className={cx('btn')}>
                            <p onClick={() => goToBackend()}>後台管理</p>
                            <p onClick={() => prompt()}>登出</p>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to={'/admin/sign-in'} className={cx('admin', 'btn_bottom')}>
                    <UserOutlined style={{ fontSize: '16px', color: '#fff' }} />
                </Link>
            )}
        </nav>
    );
};

export default withRouter(NavLeft);
