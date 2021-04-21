import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// socket.io
import io from 'socket.io-client';

// ant
import { SendOutlined, CloseCircleOutlined } from '@ant-design/icons';

import './style_module.scss';

const Chat = ({ isOpen, setIsOpen }) => {
    const [ws, setWs] = useState(null);
    const [newMessage, setNewMessage] = useState(''); // Message to be sent
    const [messages, setMessages] = useState([]); // Sent and received messages
    const chatRef = useRef();

    // 打開聊天室
    const chatroomfun = () => {
        setIsOpen(!isOpen);
    };

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
            console.log('client-event:', message);
            const incomingMessage = {
                ...message
                // ownedByCurrentUser: message.senderId === socketRef.current.id
            };
            setMessages(messages => [...messages, incomingMessage]);
        });
    };

    const handleNewMessageChange = event => {
        setNewMessage(event.target.value);
    };

    // enter
    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage('');
    };

    // 發送
    const sendMessage = messageBody => {
        // 以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
        // ws.emit('getMessageAll', message);
        ws.emit('getMessageAll', {
            body: messageBody
            // senderId: socketRef.current.id
        });
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
                        <h2>online</h2>
                    </div>
                    <div
                        className="chat-icon"
                        onClick={() => {
                            chatroomfun();
                        }}
                    >
                        <CloseCircleOutlined />
                    </div>
                </div>

                {/* 聊天內容 */}
                <div className="messages">
                    <div className="messages-content" ref={chatRef}>
                        {/* outside */}
                        <div className="messages-container">
                            <div className="message new">
                                <figure className="avatar">
                                    <img src={require(`images/admin/user01.jpg`)} alt="頭像" />
                                </figure>
                                Hi RD, I'm QA.
                                <div className="timestamp">22:46</div>
                            </div>
                        </div>
                        {/* inside */}
                        <div className="messages-container">
                            <div className="message message-personal new">
                                Hi QA, I'm RD.
                                <div className="timestamp">22:46</div>
                            </div>
                        </div>
                        {/* outside */}
                        <div className="messages-container">
                            <div className="message new">
                                <figure className="avatar">
                                    <img src={require(`images/admin/user01.jpg`)} alt="頭像" />
                                </figure>
                                where are you from ?<div className="timestamp">22:46</div>
                            </div>
                        </div>
                        {/* inside */}
                        {messages.map((data, index) => {
                            return (
                                <div className="messages-container" key={index}>
                                    <div className="message message-personal new">
                                        {data.body}
                                        <div className="timestamp">22:46</div>
                                    </div>
                                </div>
                            );
                        })}
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
