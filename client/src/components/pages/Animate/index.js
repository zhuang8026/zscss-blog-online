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
// OpenYoutubeUrl
import OpenYoutube from './OpenYoutube';
// ReduxHooks
import ReduxHooks from './ReduxHooks';
import ReduxHooksTodoList from './ReduxHooksTodoList';
// EasyRedux
import EasyRedux from './EasyRedux';

// css
import './style_module.scss';

const Animate = ({ match }) => {
    const pathData = [
        {
            title: 'dnd Drag',
            path: 'dndDrag',
            component: DndDrag
        },
        {
            title: 'Class Drag',
            path: 'dragTableClass',
            component: DragTableClass
        },
        {
            title: 'Hooks Drag',
            path: 'dragTableHooks',
            component: DragTableHooks
        },
        {
            title: 'dragGroup useContext',
            path: 'dragGroup',
            component: DragGroup
        },
        {
            title: 'drag Groupv2 normal',
            path: 'DragGroupV2Normal',
            component: DragGroupV2Normal
        },
        {
            title: 'drag Groupv2 Demo',
            path: 'dragGroupv2Demo',
            component: DragGroupV2Demo
        },
        {
            title: 'dragv2 Auto Scrollv2',
            path: 'dragv2AutoScrollv2',
            component: Dragv2AutoScrollv2
        },
        {
            title: 'dragv2 Auto Scrollv3',
            path: 'dragv2AutoScrollv3',
            component: Dragv2AutoScrollV3
        },
        {
            title: 'save to IndexedDB',
            path: 'saveToIndexedDB',
            component: SaveToIndexedDB
        },
        {
            title: 'hover create element',
            path: 'hoverCreateElement',
            component: HoverCreateElement
        },
        {
            title: 'gsapLoading',
            path: 'gsapLoading',
            component: GsapLoading
        },
        {
            title: 'move To Dom Animation',
            path: 'moveToDomAnimation',
            component: MoveToDomAnimation
        },
        {
            title: 'Open youTube popWindow',
            path: 'openYoutube',
            component: OpenYoutube
        },
        {
            title: 'ReduxHooks',
            path: 'reduxHooks',
            component: ReduxHooks
        },
        {
            title: 'ReduxHooks TodoList',
            path: 'reduxHooksTodoList',
            component: ReduxHooksTodoList
        },
        {
            title: 'Use Redux 8.1.2',
            path: 'easyRedux',
            component: EasyRedux
        }
    ];

    return (
        <main>
            {/* <NavTop /> */}
            <Tab pathData={pathData} />
            <Switch>
                {pathData.map((route, key) => (
                    <Route
                        key={`route_java_${key}`}
                        path={`${match.path}/${route.path}`}
                        // component={route.component}
                        // exact={route.exact}
                        render={() => {
                            document.title = `${route.title} | Zscss` || 'Animate | Zscss';
                            return <route.component />;
                        }}
                    />
                ))}
            </Switch>
        </main>
    );
};

export default withRouter(Animate);
