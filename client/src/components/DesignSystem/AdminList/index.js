import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { from } from 'rxjs';

// API
import axios from 'axios';
import { getAllAdminAPI } from 'api/admin';
// antd
import { CommentOutlined } from '@ant-design/icons';

// Context
import { AdminContext } from 'contexts/admin';
import { popWindowStorage } from 'components/DesignSystem/PopWindow';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const AdminList = ({ isOpen, setIsOpen, openChat }) => {
    const fetchListener = useRef(null); // fetch
    const [list, setList] = useState([]); // admin list data
    const { adminData } = useContext(AdminContext);
    const { openOrompt } = useContext(popWindowStorage);

    // admin list API (get)
    const getAllAdminAPICallBack = data => {
        fetchListener.current = from(axios(getAllAdminAPI())).subscribe(res => {
            if (res.status === 200) {
                setList(res.data);
            } else {
                console.log('sign in error');
            }
        });
    };

    const chatroomfun = data => {
        setIsOpen(true);
        // 規定 users 只能開一次聊天室
        openChat(data.sid, data.nickname, data.userimg);
    };

    const prompt = () => {
        openOrompt({
            state: 'info',
            title: 'Reminder',
            desc: 'sorry, admin is not online.',
            button: [
                {
                    name: 'Close'
                }
            ]
        });
    };

    useEffect(() => {
        getAllAdminAPICallBack();
    }, [adminData]);

    return (
        <div className={cx('rating_card', 'Admin')}>
            <div className={cx('card_title')}>Admin List</div>
            <ul className={cx('card_admin')}>
                {list.map((data, index) => {
                    return (
                        <li
                            key={index}
                            data-name={data.nickname}
                            onClick={() => {
                                data.loginStatus
                                    ? chatroomfun(data) // admin登入才能開啟視窗
                                    : prompt();
                            }}
                        >
                            <div className={cx('rating_admin_img')}>
                                <div className={cx('figure_icon')}>
                                    <img
                                        src={require(`images/Home/${data.userimg ? data.userimg : 'null_img.png'}`)}
                                        alt="頭像"
                                    />
                                </div>
                                <p>{data.nickname}</p>
                                <div className={cx(`admin_online ${data.loginStatus ? 'admin_state' : ''}`)} />
                            </div>
                            <div className={cx('rating_admin_icon')}>
                                <CommentOutlined className={cx('icon-chat')} />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AdminList;
