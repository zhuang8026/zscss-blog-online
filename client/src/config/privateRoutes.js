import React, { lazy } from 'react';
import { getBooleanFromENV } from 'components/utils';

//admin
const Backend = lazy(() => import('components/pages/Admin/Backend'));

const privateRoutes = [
    {
        path: '/admin/backend',
        component: Backend,
        exact: true,
        authRequired: true,
        layouts: ['NavLeft']
    }
];

export default privateRoutes;
