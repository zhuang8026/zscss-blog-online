import React, { useState, useEffect, useRef, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { from } from 'rxjs';

// API
import axios from 'axios';
import { getAllAdminAPI } from 'api/admin';
// Context
import { AdminContext } from 'contexts/admin';

const NavTop = () => {
    const [list, setList] = useState([]); // admin list data
    const { adminData, unsetLoggedInMember } = useContext(AdminContext);
    const fetchListener = useRef(null); // fetch
    // const WEDURL = window.location.href;

    // admin list API (get)
    const getAllAdminAPICallBack = data => {
        fetchListener.current = from(axios(getAllAdminAPI())).subscribe(res => {
            if (res.status === 200) {
                let adminNum = res.data.filter(data => {
                    return data.loginStatus !== 0;
                });
                setList(adminNum);
            } else {
                console.log('sign in error');
            }
        });
    };

    // 監聽admin 是否有將瀏覽器關閉，如果關閉，就立即將admin登出 (測試中)
    const getuserAgentHandle = () => {
        let userAgent = navigator.userAgent;
        let isOpera = userAgent.indexOf('Opera') > -1; //判斷是否Opera瀏覽器
        let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera; //判斷是否IE瀏覽器
        let isIE11 = userAgent.indexOf('rv:11.0') > -1; //判斷是否是IE11瀏覽器
        let isEdge = userAgent.indexOf('Edge') > -1 && !isIE; //判斷是否IE的Edge瀏覽器

        // console.log('userAgent:', userAgent);
        // console.log('isOpera:', isOpera);
        // console.log('isIE:', isIE);
        // console.log('isIE11:', isIE11);
        // console.log('isEdge:', isEdge);

        if (!isIE && !isEdge && !isIE11) {
            // 相容chrome和firefox
            let _beforeUnload_time = 0,
                _gap_time = 0;
            let is_chrome = navigator.userAgent.indexOf('Chrome') > -1; //是否是chrome瀏覽器
            let is_safari = navigator.userAgent.indexOf('Safari') > -1; //是否是chrome瀏覽器

            // onunload 事件在 用户退出 页面时发生。
            window.onunload = function () {
                _gap_time = new Date().getTime() - _beforeUnload_time;
                if (_gap_time <= 5) {
                    // console.log('chrome-1:', is_chrome);
                    console.log('chrome 即將關閉');
                    unsetLoggedInMember(); // 登出
                } else {
                    //瀏覽器重新整理
                }
            };
            // onbeforeunload 事件在 即将离开当前页面（刷新或关闭）时触发。
            window.onbeforeunload = function () {
                _beforeUnload_time = new Date().getTime();
                if (is_chrome) {
                    //火狐關閉執行
                    console.log('chrome-2:', is_chrome);
                    unsetLoggedInMember(); // 登出
                }
            };
        }
    };

    useEffect(() => {
        getuserAgentHandle();
    });

    useEffect(() => {
        getAllAdminAPICallBack();
    }, [adminData]);

    // 登出
    const SiginOutCallBack = () => {
        unsetLoggedInMember();
    };

    return (
        <div className="top_nav">
            <ul>
                <li>
                    {adminData.length > 0 && adminData[0].all.loginStatus ? (
                        <>
                            <div className="nav_avatar btn_left">
                                <img src={require(`images/admin/${adminData[0].all.userimg}`)} alt="avatar" />
                            </div>
                            {/* <div className="nav_btn btn_left">{adminData[0].all.nickname}</div> */}
                            <div
                                className="nav_btn btn_left btn_out"
                                onClick={() => {
                                    SiginOutCallBack();
                                }}
                            >
                                登出
                            </div>
                        </>
                    ) : (
                        <div className="nav_btn btn_left">
                            <Link
                                to={{
                                    pathname: '/admin/sign-in'
                                    // state: {
                                    //     redirectAfterLogin: location
                                    // }
                                }}
                            >
                                Admin
                            </Link>
                        </div>
                    )}

                    <div className="nav_btn btn_left">{list.length > 0 ? list.length : 0}/人</div>
                </li>
                <li>
                    <div className="nav_btn btn_right">新增</div>
                    <div className="nav_btn btn_right">查詢</div>
                </li>
            </ul>
        </div>
    );
};

export default withRouter(NavTop);
