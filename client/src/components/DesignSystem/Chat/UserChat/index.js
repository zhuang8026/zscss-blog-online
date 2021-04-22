import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// socket.io
import io from 'socket.io-client';

// ant
import { SendOutlined, CloseCircleOutlined } from '@ant-design/icons';

import './style_module.scss';
import { message } from 'antd';

const Chat = ({ isOpen, setIsOpen }) => {
    const [ws, setWs] = useState(null);
    const [adminWS, setAdminWS] = useState(false);
    const [isOut, setIsOut] = useState();
    const [newMessage, setNewMessage] = useState(''); // Message to be sent
    const [messages, setMessages] = useState([]); // Sent and received messages
    const chatRef = useRef();

    // 連線
    const connectWebSocket = () => {
        let connectionOptions = {
            'force new connection': true,
            reconnectionAttempts: 'Infinity', //avoid having user reconnect manually in order to prevent dead clients after a server restart
            timeout: 10000, //before connect_error and connect_timeout are emitted.
            transports: ['websocket']
        };
        //開啟
        let myws = io.connect('http://localhost:3002', connectionOptions);
        setWs(myws);
    };

    // 監聽
    const initWebSocket = () => {
        // 對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
        ws.on('getMessageAll', message => {
            console.log('client-getMessageAll:', message);
            const incomingMessage = {
                ...message
                // ownedByCurrentUser: message.senderId === socketRef.current.id
            };
            setMessages(messages => [...messages, incomingMessage]);
        });

        // 監聽 斷開連結
        ws.on('disConnection', mes => {
            setIsOut(mes);
        });
    };

    // 打字文字事件
    const handleNewMessageChange = event => {
        setNewMessage(event.target.value);
    };

    // 發送事件
    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');
    };

    // 資料傳送到server
    const sendMessage = messageBody => {
        // 以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
        // ws.emit('getMessageAll', message);
        ws.emit('getMessageAll', {
            body: messageBody,
            auth: false
            // senderId: socketRef.current.id
        });
    };

    // 斷開聊天室
    const closeChatroomfun = () => {
        setIsOpen(false);
        //向 Server 送出申請中斷的訊息，讓它通知其他 Client
        ws.emit('disConnection', '路人甲');
    };

    // 連線
    useEffect(() => {
        connectWebSocket(); // 連線
    }, []);

    // 監聽
    useEffect(() => {
        if (ws) {
            //連線成功在 console 中打印訊息
            console.log('success connect! - client');
            //設定監聽
            initWebSocket();
        }
    }, [ws]);

    return (
        <>
            <div className="chat">
                <div className="chat-title">
                    <figure className="avatar">
                        <img src={require(`images/admin/user01.jpg`)} alt="頭像" />
                    </figure>
                    <div className="chat-name">
                        <h1>快樂動起來</h1>
                        <h2>{newMessage ? '正在輸入...' : '已上線'}</h2>
                    </div>
                    <div
                        className="chat-icon"
                        onClick={() => {
                            closeChatroomfun();
                        }}
                    >
                        <CloseCircleOutlined />
                    </div>
                </div>

                {/* 聊天內容 */}
                <div className="messages">
                    <div className="messages-content" ref={chatRef}>
                        {/* loading animate */}
                        {adminWS ? (
                            <div className="messages-container">
                                <div className="message loading new">
                                    <figure className="avatar">
                                        <img src={require(`images/admin/user01.jpg`)} alt="頭像" />
                                    </figure>
                                    <div className="chat-loading">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="messages-container">
                                <div className="message new">
                                    <figure className="avatar">
                                        <img src={require(`images/admin/user01.jpg`)} alt="頭像" />
                                    </figure>
                                    Hi! I'm William. Can i help you ?<div className="timestamp">22:46</div>
                                </div>
                            </div>
                        )}

                        {/* inside */}
                        {messages.map((data, index) => {
                            if (data.auth) {
                                return (
                                    <div className="messages-container">
                                        <div className="message new">
                                            <figure className="avatar">
                                                <img src={require(`images/admin/user01.jpg`)} alt="頭像" />
                                            </figure>
                                            {data.body}
                                            <div className="timestamp">22:46</div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="messages-container" key={index}>
                                        <div className="message message-personal new">
                                            {data.body}
                                            <div className="timestamp">22:46</div>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                        {isOut ? <h3 className="outText">{isOut}</h3> : ''}
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

export default Chat;
