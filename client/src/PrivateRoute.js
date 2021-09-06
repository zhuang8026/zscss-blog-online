import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, authRequired, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                authRequired === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/admin/sign-in', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default ProtectedRoute;
