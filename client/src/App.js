import React, { Fragment, Suspense, useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

// DesignSystem
import NavLeft from 'components/DesignSystem/NavLeft';
import NoMatch from 'components/DesignSystem/NoMatch';
import Footer from 'components/DesignSystem/Footer';
import WebsocketNotification from 'components/DesignSystem/Socket/WebsocketNotification';
import { withFullWindowProvider, FullPopWindow } from 'components/DesignSystem/FullWindow';

// contexts
import AdminContainer from 'contexts/admin';

// config
import routes from 'config/routes';

// antd
import { notification } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';

// package
// import classnames from "classnames";
import 'scss/antd.css';

function App({ match, location, history }) {
    const [layouts, setLayouts] = useState([]);
    const { isAdmin } = WebsocketNotification(); // admin online

    // all route
    const Routes = routes.map((route, key) => (
        <Route
            key={`route_${key}`}
            path={`${route.path}`}
            exact={route.exact}
            sensitive
            render={() => {
                return <route.component localeMatch={match} routeData={route} />;
            }}
        />
    ));

    // layout & url
    const getLayoutsCallBack = () => {
        routes.map((route, key) => {
            let layoutPath = [];
            layoutPath.push(route.path.split('/')[1]);

            if (layoutPath[0].toUpperCase() === location.pathname.split('/')[1].toUpperCase()) {
                setLayouts(route.layouts);
            } else {
                console.log('no fund');
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
        <div className="App">
            <Fragment>
                {layouts.indexOf('NavLeft') >= 0 && (
                    <Suspense fallback={<></>}>
                        <NavLeft />
                    </Suspense>
                )}

                <Suspense fallback={<></>}>
                    <Switch>
                        <AdminContainer>
                            {Routes}
                            <Route component={NoMatch} />
                        </AdminContainer>
                    </Switch>
                </Suspense>

                {layouts.indexOf('Footer') >= 0 && (
                    <Suspense fallback={<></>}>
                        <Footer />
                    </Suspense>
                )}
            </Fragment>
            <FullPopWindow />
        </div>
    );
}

export default withRouter(withFullWindowProvider(App));
