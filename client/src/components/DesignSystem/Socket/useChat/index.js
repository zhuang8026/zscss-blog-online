import { useEffect, useRef, useState, useContext } from 'react';
import Cookies from 'js-cookie';

// socket
import socketIOClient from 'socket.io-client';

import moment from 'moment';
import momentTimezone from 'moment-timezone';

const useChat = roomId => {
    const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event
    const USERS_CALL_ADMIN = 'usersCallAdmin'; // 告訴admin有使用者使用聊天室
    const SOCKET_SERVER_URL = process.env.REACT_APP_API_DOMAIN || 'http://localhost:3009';

    const [messages, setMessages] = useState([]); // Sent and received messages
    const [arrayChat, setArrayChat] = useState([]); // 紀錄有多少聊天室
    const socketRef = useRef();

    useEffect(() => {
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId }
        });

        // Listens for incoming messages
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, message => {
            console.log('message:', message);

            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id
            };
            setMessages(messages => [...messages, incomingMessage]);
        });

        // Listens for incoming messages
        socketRef.current.on(USERS_CALL_ADMIN, privateData => {
            setArrayChat(arrayChat => [...arrayChat, privateData.roomId]);
        });

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (roomId, messageBody) => {
        // console.log(roomId, messageBody);
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
            roomId: roomId,
            time: moment(momentTimezone().tz('Asia/Taipei').format()).format('HH:mm'),
            auth: false
        });
    };

    // admin 發送聊天室訊息
    const sendAdminMessage = (messageBody, roomData) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            auth: true,
            body: messageBody,
            senderId: socketRef.current.id,
            time: moment(momentTimezone().tz('Asia/Taipei').format()).format('HH:mm'),
            adminData: roomData
        });
    };

    // 創建admin聊天室
    const createAdminRoom = privateData => {
        console.log('createAdminRoom:', privateData);
        socketRef.current.emit(USERS_CALL_ADMIN, privateData);
    };

    // 離開聊天室
    const closeChatroom = roomId => {
        console.log('closeChatroom:', roomId);

        // // close client any chatroom
        let array = [...arrayChat]; // make a separate copy of the array
        let index = array.indexOf(roomId);
        if (index !== -1) {
            array.splice(index, 1);
            setArrayChat(array);
        }

        //向 Server 送出申請中斷的訊息，讓它通知其他 Client
        socketRef.current.disconnect();
    };

    return { messages, arrayChat, setArrayChat, sendMessage, sendAdminMessage, closeChatroom, createAdminRoom };
};

export default useChat;
