import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

import { from } from 'rxjs';
import Cookies from 'js-cookie';

// API
import axios from 'axios';
import { postAdminSignIinAPI, postUserNameCheckInAPI } from 'api/admin';

// antd
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined, FrownOutlined } from '@ant-design/icons';

// Context
import { AdminContext } from 'contexts/admin';

import '../style_module.scss';

const SiginIn = ({ history }) => {
    const [username, setUsername] = useState(''); // username
    const [usernameStatus, setUsernameStatus] = useState(null); // username Status
    const [password, setPassword] = useState(''); // password
    const [check, setcheck] = useState(false); // checkbox
    const [isLoading, setIsLoading] = useState(false); // 載入
    const fetchListener = useRef(null); // fetch
    const { adminData, setLoggedInMember } = useContext(AdminContext);
    // console.log(adminData);
    // 確認帳號是否存在
    const userNameCheckInCallBack = objectValue => {
        const adminData = {
            account: objectValue
        };
        fetchListener.current = from(axios(postUserNameCheckInAPI(adminData))).subscribe(res => {
            console.log(res)
            if (res.status === 200) {
                if (res.data.state === 200) {
                    setUsernameStatus(true);
                } else {
                    setUsernameStatus(false);
                }
            }
        });
    };

    // 登入 && API
    const postAdminSignIinAPICallBack = data => {
        setIsLoading(true);
        const signInData = {
            account: data.username,
            password: decodeURIComponent(data.password)
        };
        fetchListener.current = from(axios(postAdminSignIinAPI(signInData))).subscribe(res => {
            // console.log('postAdminSignIinAPI:', res);
            if (res.status === 200) {
                if (res.data.state === 200) {
                    setTimeout(() => {
                        setIsLoading(false);
                        setLoggedInMember(res);
                        history.push('/');
                        // Cookies.set('admin_scToken', res.data, { expires: 7, path: '' });
                    }, 2000);
                } else {
                    setTimeout(() => {
                        setIsLoading(false);
                        openNotification();
                    }, 2000);
                }
            } else {
                setIsLoading(false);
            }
        });
    };

    // 錯誤訊息
    const openNotification = () => {
        notification.open({
            message: '404 Error',
            description: 'The account or password is incorrect. Are you sure you are the administrator ?',
            icon: <FrownOutlined style={{ color: 'red' }} />
        });
    };

    //  取消監聽
    useEffect(() => {
        return () => {
            if (fetchListener.current) fetchListener.current.unsubscribe();
        };
    }, []);

    //  取消監聽
    useEffect(() => {
        if (adminData.length > 0 && adminData[0].all.loginStatus) {
            history.replace('/');
        }
    }, [adminData]);

    return (
        <div className="signin">
            {/* <span>{title}</span> */}
            <div className="signin_inner">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true
                    }}
                    onFinish={values => {
                        postAdminSignIinAPICallBack(values);
                    }}
                >
                    <Form.Item
                        name="username"
                        hasFeedback
                        validateStatus={usernameStatus === null ? '' : usernameStatus === true ? 'success' : 'error'} // success warning error
                        help={
                            usernameStatus === null
                                ? ' '
                                : usernameStatus === true
                                ? 'ok'
                                : 'This account is not registered'
                        }
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please input your Username!'
                        //     }
                        // ]}
                        getValueProps={e => {
                            setUsername(e !== undefined ? e : '');
                        }}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            onChange={e => {
                                e.persist();
                                userNameCheckInCallBack(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        hasFeedback
                        validateStatus={password.length >= 5 ? 'success' : password.length == 0 ? '' : 'error'} // success warning error
                        help={password.length == 0 ? ' ' : password.length >= 5 ? 'ok' : 'password length max >= 6'}
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please input your Password!'
                        //     }
                        // ]}
                        getValueProps={e => {
                            setPassword(e !== undefined ? e : '');
                        }}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            maxLength={10}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" noStyle>
                            <Checkbox
                                onChange={e => {
                                    setcheck(e.target.checked);
                                }}
                            >
                                I agree to the Term of Use and Privacy Policy.
                            </Checkbox>
                        </Form.Item>

                        {/* <a className="login-form-forgot" href="#">
                            Forgot password
                        </a> */}
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            disabled={username !== '' && password !== '' && check && usernameStatus ? false : true}
                            loading={isLoading}
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default withRouter(SiginIn);
