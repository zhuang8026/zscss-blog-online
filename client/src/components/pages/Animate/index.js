import React, { lazy } from 'react';
import { Route, Switch } from 'react-router';
import { withRouter, Redirect, Link } from 'react-router-dom';

// DesignSystem
import NavTop from 'components/DesignSystem/NavTop';

// component
import Tab from './Tab';
// Drag
import DndDrag from './DndDrag';
import DragTableClass from './DragTableClass';
import DragTableHooks from './DragTableHooks';
import DragGroup from './DragGroup';
import DragGroupV2Normal from './DragGroupV2Normal';
import DragGroupV2Demo from './DragGroupV2Demo';
import Dragv2AutoScrollv2 from './Dragv2AutoScrollv2';
import Dragv2AutoScrollV3 from './Dragv2AutoScrollV3';
// IndexedDB
import SaveToIndexedDB from './SaveToIndexedDB';
// Hover
import HoverCreateElement from './HoverCreateElement';
// Gsap
import GsapLoading from './GsapLoading';
// MoveToDomAnimation
import MoveToDomAnimation from './MoveToDomAnimation';
// css
import './style_module.scss';

const Animate = ({ match }) => {
    const pathData = [
        {
            title: 'dndDrag',
            path: 'dndDrag',
            component: DndDrag
        },
        {
            title: 'Class-Drag',
            path: 'dragTableClass',
            component: DragTableClass
        },
        {
            title: 'Hooks-Drag',
            path: 'dragTableHooks',
            component: DragTableHooks
        },
        {
            title: 'dragGroup-useContext',
            path: 'dragGroup',
            component: DragGroup
        },
        {
            title: 'dragGroupv2-normal',
            path: 'DragGroupV2Normal',
            component: DragGroupV2Normal
        },
        {
            title: 'dragGroupv2Demo',
            path: 'dragGroupv2Demo',
            component: DragGroupV2Demo
        },
        {
            title: 'dragv2AutoScrollv2',
            path: 'dragv2AutoScrollv2',
            component: Dragv2AutoScrollv2
        },
        {
            title: 'dragv2AutoScrollv3',
            path: 'dragv2AutoScrollv3',
            component: Dragv2AutoScrollV3
        },
        {
            title: 'saveToIndexedDB',
            path: 'saveToIndexedDB',
            component: SaveToIndexedDB
        },
        {
            title: 'hoverCreateElement',
            path: 'hoverCreateElement',
            component: HoverCreateElement
        },
        {
            title: 'gsapLoading',
            path: 'gsapLoading',
            component: GsapLoading
        },
        {
            title: 'moveToDomAnimation',
            path: 'moveToDomAnimation',
            component: MoveToDomAnimation
        }
    ];

    return (
        <main>
            <NavTop />
            <Tab pathData={pathData} />
            <Switch>
                {pathData.map((route, key) => (
                    <Route
                        key={`route_java_${key}`}
                        path={`${match.path}/${route.path}`}
                        component={route.component}
                        // exact={route.exact}
                        // render={() => {
                        //     return <route.component />;
                        // }}
                    />
                ))}
            </Switch>
        </main>
    );
};

export default withRouter(Animate);
