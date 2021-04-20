import React, { useState, useEffect, useRef } from 'react';
// import { withRouter, Link, Redirect } from 'react-router-dom';

import moment from 'moment';
import momentTimezone from 'moment-timezone';

import './style_module.scss';

const headLoading = () => {
    return <span className="rating_loading"></span>;
};

const HeaderTitle = ({ penImg, title }) => {
    const [time, setTime] = useState();
    const [Amtime, setAmTime] = useState();

    useEffect(() => {
        setTimeout(() => {
            setTime(moment(momentTimezone().tz('Asia/Taipei').format()).format('YYYY/MM/DD HH:mm:ss'));
            setAmTime(moment(momentTimezone().tz('America/Iqaluit').format()).format('YYYY/MM/DD HH:mm:ss'));
        }, 1000);
    }, [time]);

    return (
        <div className="rating_title_inner">
            <div className="rating_title">
                <div className="figure_icon">
                    <img src={require(`images/pen/${penImg ? penImg : 'null_img.png'}`)} alt="頭像" />
                </div>
                {title ? <h1> {title} </h1> : <span data-heading="Script.">{'JavaScript.'}</span>}
            </div>
            <div className="rating_time">
                <div className="rating_data">
                    {time ? <span className="rating_t1">{time}</span> : headLoading()}
                    {time ? <span className="rating_t2">已訪問 10 人數</span> : headLoading()}
                    {time ? <span className="rating_t3">目前所在類別 IT技術</span> : headLoading()}
                </div>
            </div>
        </div>
    );
};

export default HeaderTitle;
