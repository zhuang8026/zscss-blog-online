import React, { Fragment, Suspense, useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

// DesignSystem
import NavLeft from 'components/DesignSystem/NavLeft';
import NoMatch from 'components/DesignSystem/NoMatch';
import Footer from 'components/DesignSystem/Footer';
import WebsocketNotification from 'components/DesignSystem/Socket/WebsocketNotification';
import { withFullWindowProvider, FullPopWindow } from 'components/DesignSystem/FullWindow';
import { withPopWindowProvider, PopWindow } from 'components/DesignSystem/PopWindow';

// Context
// import AdminContainer, { AdminContext } from 'contexts/admin';

// route
import PrivateRoute from './PrivateRoute';

// config
import routes from 'config/routes';
import privateRoutes from 'config/privateRoutes.js';

// Context
import AdminContainer, { AdminContext } from 'contexts/admin';

// redux
// import store from './store';

// antd
import { notification } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// import 'scss/antd.css';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

function App({ match, location, history }) {
    const [layouts, setLayouts] = useState([]);
    const { isAdmin } = WebsocketNotification(); // admin online

    const { adminData, detailData, ListenAdminSignIn } = useContext(AdminContext);

    // --- redux test ---
    // // 獲取當前使用者
    // const currentUser = store.getState().user;
    // // console.log('user:', currentUser);
    // // 設置新的使用者
    // store.dispatch({ type: 'SET_USER', user: { name: 'John Doe' } });
    // // 獲取更新後的使用者
    // const updatedUser = store.getState().user;
    // // console.log('user:', updatedUser); // { name: 'John Doe' }

    // all route
    const Routes = () => {
        return routes.map((route, key) => (
            <Route
                key={`route_${key}`}
                path={`${route.path}`}
                exact={route.exact}
                sensitive
                render={() => {
                    document.title = `${route.title} | Zscss`;
                    return <route.component localeMatch={match} routeData={route} />;
                }}
            />
        ));
    };

    // PrivateRoute
    const PrivateRoutes = () => {
        if (adminData.length > 0) {
            let authRequired = adminData[0]?.loginStatus;
            return privateRoutes.map((route, key) => (
                <PrivateRoute
                    path={`${route.path}`}
                    exact={route.exact}
                    authRequired={route.authRequired === authRequired}
                    component={route.component}
                />
            ));
        } else {
            return <>Sorry, you don't have permission.</>;
        }
    };

    // layout & url
    const getLayoutsCallBack = () => {
        routes.map((route, key) => {
            let layoutPath = [];
            layoutPath.push(route.path.split('/')[1]);

            if (layoutPath[0].toUpperCase() === location.pathname.split('/')[1].toUpperCase()) {
                setLayouts(route.layouts);
            } else {
                // console.log('no fund');
            }
        });
    };

    // 管理者登入提示
    const openAdminNotification = adminName => {
        notification.open({
            message: `Admin: ${adminName.name} is coming !`,
            description: 'Contact me if you have any questions !',
            icon: <SmileTwoTone twoToneColor="#52c41a" />
        });
    };

    useEffect(() => {
        getLayoutsCallBack();
    });

    // 管理員上線 全局廣播
    useEffect(() => {
        if (isAdmin != '') openAdminNotification(isAdmin);
    }, [isAdmin]);

    return (
        <div className={cx('App')}>
            <Fragment>
                {layouts.indexOf('NavLeft') >= 0 && (
                    <Suspense fallback={<></>}>
                        <NavLeft />
                    </Suspense>
                )}

                <Suspense fallback={<></>}>
                    <Switch>
                        {Routes()}
                        {PrivateRoutes()}
                        <Route component={NoMatch} />
                    </Switch>
                </Suspense>

                {layouts.indexOf('Footer') >= 0 && (
                    <Suspense fallback={<></>}>
                        <Footer />
                    </Suspense>
                )}
            </Fragment>

            {/**
             * 可隨意添加 comment
             */}
            <FullPopWindow />

            {/**
             * 固定 component，這是一個自定義alert
             */}
            <PopWindow />
        </div>
    );
}

export default withRouter(withFullWindowProvider(withPopWindowProvider(App)));
