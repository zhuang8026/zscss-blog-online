import React, { lazy } from 'react';
import { getBooleanFromENV } from 'components/utils';

const Home = lazy(() => import('components/pages/Home'));
const penDetail = lazy(() => import('components/pages/penDetail'));
const Animate = lazy(() => import('components/pages/Animate'));

//admin
const SiginIn = lazy(() => import('components/pages/Admin/SiginIn'));
const SiginUp = lazy(() => import('components/pages/Admin/SiginUp'));

//test
const Test = lazy(() => import('components/pages/Test'));

const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
        authRequired: false,
        layouts: ['NavLeft']
    },
    {
        path: '/admin/sign-in',
        component: SiginIn,
        exact: true,
        authRequired: false,
        layouts: []
    },
    {
        path: '/admin/sign-up',
        component: SiginUp,
        exact: true,
        authRequired: false,
        layouts: ['']
    },
    {
        path: '/pen-detail/:id',
        component: penDetail,
        exact: true,
        authRequired: false,
        layouts: ['NavLeft']
    },
    {
        path: '/test',
        component: Test,
        exact: true,
        authRequired: false,
        layouts: ['NavLeft']
    }
];

//------- BEGIN: 藉由feature flag開關routes----------
if (getBooleanFromENV('REACT_APP_IS_JAVA_OPEN', false)) {
    routes.push(
        {
            path: '/animate/:param?',
            component: Animate,
            exact: true,
            authRequired: false,
            layouts: ['NavLeft']
        }
        // {
        //     path: '/java/:param',
        //     component: Java,
        //     exact: true,
        //     authRequired: false,
        //     layouts: ['NavLeft']
        // }
    );
}

export default routes;
