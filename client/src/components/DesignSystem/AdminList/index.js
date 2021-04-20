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

import './style_module.scss';

const AdminList = () => {
    const fetchListener = useRef(null); // fetch
    const [list, setList] = useState([]); // admin list data
    const { adminData } = useContext(AdminContext);

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

    useEffect(() => {
        getAllAdminAPICallBack();
    }, [adminData]);

    return (
        <div className="rating_card Admin">
            <div className="card_title">Admin List</div>
            <ul className="card_admin">
                {list.map((data, index) => {
                    return (
                        <li key={index} data-name={data.nickname}>
                            <div className="rating_admin_img">
                                <div className="figure_icon">
                                    <img
                                        src={require(`images/Home/${data.userimg ? data.userimg : 'null_img.png'}`)}
                                        alt="頭像"
                                    />
                                </div>
                                <p>{data.nickname}</p>
                                <div className={`admin_online ${data.loginStatus ? 'admin_state' : ''}`} />
                            </div>
                            <div className="rating_admin_icon">
                                <CommentOutlined className="icon-chat" />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AdminList;
