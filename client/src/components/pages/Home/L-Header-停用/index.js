import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

import moment from 'moment';
import momentTimezone from 'moment-timezone';

const headLoading = () => {
    return <span className="rating_loading"></span>;
};

const Header = () => {
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
                    <img src={require(`images/Home/test.jpg`)} alt="頭像" />
                </div>
                <h2>
                    Code sharing for <span>william.chuang</span>
                </h2>
            </div>
            <div className="rating_time">
                <div className="rating_data">
                    {time ? <span className="rating_t1">{time}</span> : headLoading()}
                    {time ? <span className="rating_t2">已訪問 10 人數</span> : headLoading()}
                    {time ? <span className="rating_t3">目前所在類別 react程式</span> : headLoading()}
                </div>
            </div>
        </div>
    );
};

export default Header;
