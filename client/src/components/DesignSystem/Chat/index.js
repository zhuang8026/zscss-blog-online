import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

import { SendOutlined, CloseCircleOutlined } from '@ant-design/icons';

import './style_module.scss';

const Chat = () => {
    return (
        <>
            <div className="chat">
                <div className="chat-title">
                    <figure className="avatar">
                        <img src={require(`images/admin/user01.jpg`)} alt="頭像" />
                    </figure>
                    <div className="chat-name">
                        <h1>快樂動起來</h1>
                        <h2>online</h2>
                    </div>
                    <div className="chat-icon">
                        <CloseCircleOutlined />
                    </div>
                </div>

                {/* 聊天內容 */}
                <div className="messages">
                    <div className="messages-content">
                        {/* outside */}
                        <div className="messages-container">
                            <div className="message new">
                                <figure className="avatar">
                                    <img src={require(`images/admin/user01.jpg`)} alt="頭像" />
                                </figure>
                                Hi there, I'm Fabio and you?
                                <div className="timestamp">22:46</div>
                            </div>
                        </div>
                        {/* inside */}
                        <div className="messages-container">
                            <div class="message message-personal new">
                                Hi there, I'm Fabio and you?
                                <div className="timestamp">22:46</div>
                            </div>
                        </div>
                        {/* outside */}
                        <div className="messages-container">
                            <div className="message new">
                                <figure className="avatar">
                                    <img src={require(`images/admin/user01.jpg`)} alt="頭像" />
                                </figure>
                                Hi there, I'm Fabio and you?
                                <div className="timestamp">22:46</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="message-box">
                    <textarea type="text" className="message-input" placeholder="message..."></textarea>
                    <SendOutlined className="message-submit" />
                </div>
            </div>
        </>
    );
};

export default Chat;
