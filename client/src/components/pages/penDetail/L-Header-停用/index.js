import React, { useState, useEffect, useRef, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

import moment from 'moment';
import momentTimezone from 'moment-timezone';

// Context
import { AdminContext } from 'contexts/admin';

const headLoading = () => {
    return <span className="rating_loading"></span>;
};

const Header = ({ match }) => {
    const [time, setTime] = useState();
    const { detailData, detailPenAPIHandle } = useContext(AdminContext);

    useEffect(() => {
        detailPenAPIHandle({ id: match.params.id });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setTime(moment(momentTimezone().tz('Asia/Taipei').format()).format('YYYY/MM/DD HH:mm:ss'));
            // setAmTime(moment(momentTimezone().tz('America/Iqaluit').format()).format('YYYY/MM/DD HH:mm:ss'));
        }, 1000);
    }, [time]);

    return (
        <div className="rating_title_inner">
            <div className="rating_title">
                {/* {detailData ? ( */}
                {/* <div className="figure_icon">
                    <img src={require(`images/pen/${detailData.penImg}`)} alt="頭像" />
                </div> */}
                {/* ) : (
                    <div className="figure_icon"></div>
                )} */}
                <h2>JavaScript notes</h2>
            </div>
            <div className="rating_time">
                <div className="rating_data">
                    {time ? <span className="rating_t1">{time}</span> : headLoading()}
                    {time ? <span className="rating_t2">已訪問 10 人數</span> : headLoading()}
                    {time ? <span className="rating_t3">目前所在類別 notes</span> : headLoading()}
                </div>
            </div>
        </div>
    );
};

export default withRouter(Header);
