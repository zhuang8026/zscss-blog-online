import React, { Fragment, Suspense, useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

// DesignSystem
import NavLeft from 'components/DesignSystem/NavLeft';
import NoMatch from 'components/DesignSystem/NoMatch';
import Footer from 'components/DesignSystem/Footer';

import AdminContainer from 'contexts/admin';

// config
import routes from 'config/routes';

// package
// import classnames from "classnames";
import 'scss/antd.css';

function App({ match, location }) {
    const [layouts, setLayouts] = useState([]);
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
            }
        });
    };

    useEffect(() => {
        getLayoutsCallBack();
    });

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
                        <AdminContainer>{Routes}</AdminContainer>
                        <Route component={NoMatch} />
                    </Switch>
                </Suspense>

                {layouts.indexOf('Footer') >= 0 && (
                    <Suspense fallback={<></>}>
                        <Footer />
                    </Suspense>
                )}
            </Fragment>
        </div>
    );
}

export default withRouter(App);
