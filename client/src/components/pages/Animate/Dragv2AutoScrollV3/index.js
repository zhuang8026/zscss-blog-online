import React from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';

import DragGroupV3 from '../Component/DragGroupV3';

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

const Dragv2AutoScroll = () => {
    return (
        <>
            <div className="demoScrollv3">
                <DragGroupV3
                    value={dataV2}
                    customClass={''}
                    maxHeight={'340px'}
                    onDrop={event => console.log(event)} // methods
                    onClick={event => console.log(event)} // methods
                >
                    {(data, index) => {
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
                    }}
                </DragGroupV3>
            </div>
        </>
    );
};

export default withRouter(Dragv2AutoScroll);
