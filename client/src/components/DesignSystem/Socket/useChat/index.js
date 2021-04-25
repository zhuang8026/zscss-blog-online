import { useEffect, useRef, useState } from 'react';

// socket
import socketIOClient from 'socket.io-client';

import moment from 'moment';
import momentTimezone from 'moment-timezone';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'; // Name of the event
const USERS_CALL_ADMIN = 'usersCallAdmin'; // 告訴admin有使用者使用聊天室
const SOCKET_SERVER_URL = 'http://localhost:3002';

const useChat = roomId => {
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
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id
            };
            setMessages(messages => [...messages, incomingMessage]);
        });

        // Listens for incoming messages
        socketRef.current.on(USERS_CALL_ADMIN, roomId => {
            console.log('USERS_CALL_ADMIN - roomId:', roomId);
            setArrayChat(arrayChat => [...arrayChat, roomId]);
        });

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = messageBody => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
            time: moment(momentTimezone().tz('Asia/Taipei').format()).format('HH:mm'),
            auth: false
        });
    };

    const sendAdminMessage = messageBody => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
            time: moment(momentTimezone().tz('Asia/Taipei').format()).format('HH:mm'),
            auth: true
        });
    };

    const createAdminRoom = roomId => {
        socketRef.current.emit(USERS_CALL_ADMIN, roomId);
    };

    // 離開聊天室
    const closeChatroom = roomId => {
        // setIsOpen(false);
        console.log('closeChatroom:', roomId);

        // close client any chatroom
        let array = [...arrayChat]; // make a separate copy of the array
        let index = array.indexOf(roomId);
        if (index !== -1) {
            array.splice(index, 1);
            setArrayChat(array);
        }

        //向 Server 送出申請中斷的訊息，讓它通知其他 Client
        socketRef.current.disconnect();
    };

    return { messages, arrayChat, sendMessage, sendAdminMessage, closeChatroom, createAdminRoom };
};

export default useChat;
