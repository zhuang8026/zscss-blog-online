import React, { useState, useEffect, useRef } from 'react';
// import { withRouter, Link, Redirect } from 'react-router-dom';

import moment from 'moment';
import momentTimezone from 'moment-timezone';

// ant
import { Input } from 'antd';
import { SendOutlined, CloseCircleOutlined, UserOutlined, ThunderboltOutlined } from '@ant-design/icons';

// component
import useChat from '../useChat';

// css
import './style_module.scss';

const ChatRoom = ({ roomData, setIsOpen, closeUsersChatroomFun }) => {
    // const [userData, setUserData] = useState({});
    // const [isLoading, setIsLoading] = useState(false);

    // ---- new ----
    const { messages, sendMessage, closeChatroom, arrayChat, createAdminRoom } = useChat(roomData.roomId); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState(''); // Message to be sent
    const divRef = useRef(null);

    // console.log('messages:', messages); // all messages（array）

    const handleNewMessageChange = event => {
        setNewMessage(event.target.value);
    };

    // send message
    const handleSendMessage = () => {
        if (newMessage !== '' && newMessage !== '\n') {
            sendMessage(roomData.roomId, newMessage);
            setNewMessage('');
        }
    };

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, [messages]);

    useEffect(() => {
        createAdminRoom(roomData);
    }, [roomData.roomId]);

    // 使用者輸入身分
    // if (userData && !isLoading) {
    //     return (
    //         <div className="chat">
    //             <div className="chat-title">
    //                 <figure className="avatar">
    //                     {/* <img src={require(`images/admin/user01.jpg`)} alt="頭像" /> */}
    //                     <img
    //                         src={require(`images/admin/${roomData.adminImg ? roomData.adminImg : 'null_img.png'}`)}
    //                         alt="頭像"
    //                     />
    //                 </figure>
    //                 <div className="chat-name">
    //                     <h1>{roomData.adminName}</h1>
    //                     <h2>room-connect: {roomData.roomId}</h2>
    //                 </div>
    //                 <div
    //                     className="chat-icon"
    //                     onClick={() => {
    //                         // closeChatroom(roomData.roomId);
    //                         closeUsersChatroomFun(roomData.roomId);
    //                         setIsOpen(false);
    //                     }}
    //                 >
    //                     <CloseCircleOutlined />
    //                 </div>
    //             </div>
    //             {/* 聊天內容 */}
    //             <div className="messages">
    //                 <div className="create_users">
    //                     <div className="users_avatar">
    //                         <img src={require('images/admin/doge.png')} alt="users" />
    //                     </div>
    //                     <div className="users_inner">
    //                         <div className="users_ni">
    //                             <h3> Name : </h3>
    //                             <Input
    //                                 placeholder="what you name ?"
    //                                 maxLength="5"
    //                                 prefix={<UserOutlined />}
    //                                 onChange={e => {
    //                                     console.log(e.target.value);
    //                                     setUserData({ ...userData, name: e.target.value });
    //                                 }}
    //                             />
    //                         </div>
    //                         <div className="users_ni">
    //                             <h3> ID : </h3>
    //                             <Input
    //                                 placeholder="what you random id ?"
    //                                 maxLength="5"
    //                                 prefix={<ThunderboltOutlined />}
    //                                 onChange={e => {
    //                                     console.log(e.target.value);
    //                                     setUserData({ ...userData, userId: e.target.value });
    //                                 }}
    //                             />
    //                         </div>
    //                         {/* confrim */}
    //                         <div className="users_button">
    //                             <button onClick={() => setIsLoading(true)}>GO!</button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <>
            <div className="chat">
                <div className="chat-title">
                    <figure className="avatar">
                        {/* <img src={require(`images/admin/user01.jpg`)} alt="頭像" /> */}
                        <img
                            src={require(`images/admin/${roomData.adminImg ? roomData.adminImg : 'null_img.png'}`)}
                            alt="頭像"
                        />
                    </figure>
                    <div className="chat-name">
                        <h1>{roomData.adminName}</h1>
                        <h2>room-connect: {roomData.roomId}</h2>
                    </div>
                    <div
                        className="chat-icon"
                        onClick={() => {
                            // closeChatroom(roomData.roomId);
                            closeUsersChatroomFun(roomData.roomId);
                            setIsOpen(false);
                        }}
                    >
                        <CloseCircleOutlined />
                    </div>
                </div>

                {/* 聊天內容 */}
                <div className="messages">
                    <div className="messages-content" ref={divRef}>
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
                                                        data.adminData.adminImg
                                                            ? data.adminData.adminImg
                                                            : 'null_img.png'
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
                                            <figure className="avatar">
                                                <img src={require('images/admin/doge.png')} alt="users" />
                                            </figure>
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
                            if (e.keyCode === 13) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    ></textarea>
                    <SendOutlined className="message-submit" onClick={handleSendMessage} />
                </div>
            </div>
        </>
    );
};

export default ChatRoom;
