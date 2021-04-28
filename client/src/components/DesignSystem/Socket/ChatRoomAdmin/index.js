import React, { useState, useEffect, useRef } from 'react';
// import { withRouter, Link, Redirect } from 'react-router-dom';

import moment from 'moment';
import momentTimezone from 'moment-timezone';

// socket.io
import io from 'socket.io-client';

// ant
import { SendOutlined, CloseCircleOutlined } from '@ant-design/icons';

// component
import useChat from '../useChat';

// css
import './style_module.scss';

const ChatRoomAdmin = ({ roomData, closeAdminChatroomFun }) => {
    const chatRef = useRef();
    const { messages, sendAdminMessage } = useChat(roomData.roomId); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = React.useState(''); // Message to be sent

    const handleNewMessageChange = event => {
        setNewMessage(event.target.value);
    };

    // send message
    const handleSendMessage = () => {
        sendAdminMessage(newMessage, roomData);
        setNewMessage('');
    };

    return (
        <>
            <div className="chatRoomAdmin">
                <div className="chat-title">
                    <figure className="avatar">
                        <img
                            src={require(`images/admin/${roomData.adminImg ? roomData.adminImg : 'null_img.png'}`)}
                            alt="頭像"
                        />
                    </figure>
                    <div className="chat-name">
                        <h1>{roomData.adminName}</h1>
                        <h2>room-connect: {roomData.roomId}</h2>
                    </div>
                    <div className="chat-icon" onClick={() => closeAdminChatroomFun(roomData.roomId)}>
                        <CloseCircleOutlined />
                    </div>
                </div>

                {/* 聊天內容 */}
                <div className="messages">
                    <div className="messages-content" ref={chatRef}>
                        {/* loading 動畫 */}
                        {/* <div className="messages-container">
                            <div className="message loading new">
                                <figure className="avatar">
                                    <img
                                        src={require(`images/admin/${
                                            roomData.adminImg ? roomData.adminImg : 'null_img.png'
                                        }`)}
                                        alt="頭像"
                                    />
                                </figure>
                                <div className="chat-loading">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div> */}

                        {/* admin 歡迎詞 */}
                        <div className="messages-container">
                            <div className="message new">
                                <figure className="avatar">
                                    <img
                                        src={require(`images/admin/${
                                            roomData.adminImg ? roomData.adminImg : 'null_img.png'
                                        }`)}
                                        alt="頭像"
                                    />
                                </figure>
                                Hi! I'm William. Can i help you ?
                                <div className="timestamp">
                                    {moment(momentTimezone().tz('Asia/Taipei').format()).format('HH:mm')}
                                </div>
                            </div>
                        </div>

                        {/* inside */}
                        {messages.map((data, index) => {
                            if (data.auth) {
                                return (
                                    <div className="messages-container">
                                        <div className="message new">
                                            <figure className="avatar">
                                                <img
                                                    src={require(`images/admin/${
                                                        roomData.adminImg ? roomData.adminImg : 'null_img.png'
                                                    }`)}
                                                    alt="頭像"
                                                />
                                            </figure>
                                            {data.body}
                                            <div className="timestamp">{data.time}</div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="messages-container" key={index}>
                                        <div className="message message-personal new">
                                            {data.body}
                                            <div className="timestamp">{data.time}</div>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                        {/* {isOut ? <h3 className="outText">{isOut}</h3> : ''} */}
                    </div>
                </div>

                <div className="message-box">
                    <textarea
                        type="text"
                        className="message-input"
                        placeholder="message..."
                        value={newMessage}
                        onChange={handleNewMessageChange}
                        onKeyDown={e => {
                            if (e.keyCode === 13) handleSendMessage();
                        }}
                    ></textarea>
                    <SendOutlined className="message-submit" onClick={handleSendMessage} />
                </div>
            </div>
        </>
    );
};

export default ChatRoomAdmin;
