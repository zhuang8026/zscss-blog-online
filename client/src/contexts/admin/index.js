//react
import React, { lazy, useState, createContext, useEffect, useRef, useCallback, useContext } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { from } from 'rxjs';
import Cookies from 'js-cookie';

// API
import axios from 'axios';
import { postAdminSignIinAPI, postAdminSignOutAPI, getVerifyTokenAPI } from 'api/admin';
import { detailPenAPI } from 'api/products';

// DesignSystem
import WebsocketNotification from 'components/DesignSystem/Socket/WebsocketNotification';

// antd
import { notification } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';

export const AdminContext = createContext();

const AdminContainer = props => {
    const { history, location, match } = props;
    // const [admin, setAdmin] = useState(JSON.parse(Cookies.get('admin_token')));
    const [adminData, setAdminData] = useState([]);
    const [detailData, setDetailData] = useState({}); // 此頁資料
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 載入專用
    const [isLoading, setIsLoading] = useState(false); // 登入專用
    const fetchListener = useRef(null); // fetch

    const { publicAdmin } = WebsocketNotification(); // admin online

    // 登入
    const setLoggedInMember = res => {
        setIsLoggedIn(true);
        // 设置Cookie的过期时间为2分钟
        const eightHoursInMilliseconds = 9 * 60 * 60 * 1000; // 9小时的毫秒数
        const expirationTime = new Date(Date.now() + eightHoursInMilliseconds);
        Cookies.set('admin_token', res.data, { expires: expirationTime, path: '' });
        Cookies.set('_token', res.data.token, { expires: expirationTime, path: '' });

        const IsAdmin = [];
        IsAdmin.push({ all: JSON.parse(Cookies.get('admin_token')) });

        setAdminData(IsAdmin);

        // admin 上線廣播
        publicAdmin(res.data.nickname);
    };

    // 登出
    const unsetLoggedInMember = () => {
        let admin_token = JSON.parse(Cookies.get('admin_token'));
        const data = {
            account: admin_token.body.account,
            password: admin_token.body.password
        };
        fetchListener.current = from(axios(postAdminSignOutAPI(data))).subscribe(res => {
            if (res.status === 200) {
                console.log('sign out ok');
                openNotification();
                setIsLoggedIn(false);
                Cookies.remove('admin_token', { path: '' });
                Cookies.remove('_token', { path: '' });
                const isAdmin = {
                    body: null
                };
                setAdminData(isAdmin);
                history.replace('/');
            }
        });
    };

    // 提示訊息
    const openNotification = () => {
        notification.open({
            message: 'SUCCESS ! BYE~',
            description: 'Admin sign out success.',
            icon: <SmileTwoTone twoToneColor="orange" />
        });
    };

    // 管理者登入提示
    const openAdminNotification = adminName => {
        notification.open({
            message: `Admin: ${adminName.name} is coming !`,
            description: `${adminName.time} - Admin sign in success.`,
            icon: <SmileTwoTone twoToneColor="#52c41a" />
        });
    };

    // 登入監控 (令牌時效 1min)
    const ListenAdminSignIn = () => {
        let token = Cookies.get('_token') || '';
        let admin_token = Cookies.get('admin_token') || '';

        fetchListener.current = from(axios(getVerifyTokenAPI(token))).subscribe(res => {
            console.log('getVerifyTokenAPI:', res);
            if (res.status == 200) {
                if (res.data.state === 200) {
                    console.log('admin verify token success');
                    const IsAdmin = [];
                    IsAdmin.push({ all: JSON.parse(Cookies.get('admin_token')) });
                    setAdminData(IsAdmin);

                } else {
                    console.log('admin verify token failed');
                    if (admin_token !== '') {
                        unsetLoggedInMember();
                    }
                }
            }
        });
    };

    // 細節頁面資料/detail001
    const detailPenAPIHandle = dataId => {
        setIsLoading(true);
        fetchListener.current = axios(detailPenAPI('GET', dataId))
            .then(res => {
                setIsLoading(false);
                setDetailData(res.data.results);
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        ListenAdminSignIn();
    }, []);

    // useEffect(() => {
    //     let admin_token = Cookies.get('admin_token') || '';
    //     if (admin_token === '') {
    //         unsetLoggedInMember();
    //     }
    // }, []);

    return (
        <AdminContext.Provider
            value={{
                isLoading,
                isLoggedIn,
                // --- 管理者 ---
                adminData,
                setLoggedInMember,
                unsetLoggedInMember,
                ListenAdminSignIn, // 監控令牌時效
                // --- 細節頁 ---
                detailData,
                detailPenAPIHandle,
                // --- 提示框 ---
                openAdminNotification
            }}
        >
            {props.children}
        </AdminContext.Provider>
    );
};

export default withRouter(AdminContainer);
