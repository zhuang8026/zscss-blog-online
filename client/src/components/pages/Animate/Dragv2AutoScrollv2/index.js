import React, { useRef } from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';

import DragGroupV2 from '../Component/DragGroupV2';

// css
import './style_module.scss';

// 測試用 data
const dataV2 = [
    {
        perCent: '10%',
        status: false
    },
    {
        perCent: '87%',
        status: true,
        inner: 'front end vs back end'
    },
    {
        perCent: '100%',
        status: true,
        inner: 'LOL-1 vs PUBG-1'
    },
    {
        perCent: '99%',
        status: true,
        inner: 'LOL-2 vs PUBG-2'
    },
    {
        perCent: '34%',
        status: true,
        inner: 'LOL-3 vs PUBG-3'
    }
];

// 測試用 componet
const DemoComponent = data => {
    return (
        <>
            {data.status ? (
                <div className="demo1-1">
                    <span>{data.perCent}</span>
                    <div className="demo1-2">
                        <p className="demo1-2-icon">:::</p>
                        <div className="demo-color"></div>
                        <p>{data.inner}</p>
                    </div>
                </div>
            ) : (
                <div className="demo1-1 ">
                    <span>{data.perCent}</span>
                    <div className="demo1-2 demo1-2-2">
                        <p>+</p>
                    </div>
                </div>
            )}
        </>
    );
};

const Dragv2AutoScrollv2 = () => {
    const dom = useRef(null);
    return (
        <>
            <div className="demo1" ref={dom}>
                <DragGroupV2
                    domRef={dom}
                    value={dataV2}
                    component={DemoComponent}
                    onDrop={event => console.log(event)} // methods
                    onClick={event => console.log(event)} // methods
                />
            </div>
        </>
    );
};

export default withRouter(Dragv2AutoScrollv2);
