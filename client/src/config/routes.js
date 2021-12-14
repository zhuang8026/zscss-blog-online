import React, { lazy } from 'react';
import { getBooleanFromENV } from 'components/utils';

const Home = lazy(() => import('components/pages/Home'));
const penDetail = lazy(() => import('components/pages/penDetail'));
const Animate = lazy(() => import('components/pages/Animate'));

//admin
const SiginIn = lazy(() => import('components/pages/Admin/SiginIn'));
const SiginUp = lazy(() => import('components/pages/Admin/SiginUp'));
// const Backend = lazy(() => import('components/pages/Admin/Backend'));

// 404
// const NoMatch = lazy(() => import('components/DesignSystem/NoMatch'));
//test
const Test = lazy(() => import('components/pages/Test'));

const routes = [
    {
        path: '/',
        title: 'Home',
        component: Home,
        exact: true,
        authRequired: false,
        layouts: ['NavLeft']
    },
    {
        path: '/admin/sign-in',
        title: 'Sigin in',
        component: SiginIn,
        exact: true,
        authRequired: false,
        layouts: ['']
    },
    {
        path: '/admin/sign-up',
        title: 'Sigin up',
        component: SiginUp,
        exact: true,
        authRequired: false,
        layouts: ['']
    },
    {
        path: '/pen-detail/:id',
        title: 'Detail',
        component: penDetail,
        exact: true,
        authRequired: false,
        layouts: ['NavLeft']
    },
    {
        path: '/test',
        title: 'Test',
        component: Test,
        exact: true,
        authRequired: false,
        layouts: ['NavLeft']
    }
];

//------- BEGIN: 藉由feature flag開關routes----------
if (getBooleanFromENV('REACT_APP_IS_JAVA_OPEN', false)) {
    routes.push({
        path: '/animate/:param?',
        title: 'Animate',
        component: Animate,
        exact: true,
        authRequired: false,
        layouts: ['NavLeft']
    });
}

//------- BEGIN: 後台管理 ----------
// routes.push({
//     path: '/admin/backend',
//     component: Backend,
//     exact: true,
//     authRequired: true,
//     layouts: ['']
// });

// routes.push({
//     path: '/404',
//     component: NoMatch,
//     exact: false,
//     authRequired: false,
//     layouts: ['NavLeft']
// });

export default routes;
