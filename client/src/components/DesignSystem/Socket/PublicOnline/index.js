import { useEffect, useRef, useState } from 'react';

// socket
import IO from 'socket.io-client';

import moment from 'moment';
import momentTimezone from 'moment-timezone';

const ADMIN_ONLINE = 'adminOnline'; // admin 上線通知
const SOCKET_SERVER_URL = 'http://localhost:3002';

const PublicOnline = () => {
    const [isAdmin, setIsAdmin] = useState(''); // 紀錄已上線管理者
    const socketRef = useRef();

    useEffect(() => {
        // Creates a WebSocket connection
        socketRef.current = IO(SOCKET_SERVER_URL);

        // Listens for incoming messages
        socketRef.current.on(ADMIN_ONLINE, name => {
            // console.log('ADMIN_ONLINE:', name);
            // console.log(moment(momentTimezone().tz('Asia/Taipei').format()).format('YYYY/MM/DD HH:mm:ss'));
            setIsAdmin({
                name: name,
                time: moment(momentTimezone().tz('Asia/Taipei').format()).format('YYYY/MM/DD HH:mm:ss')
            });
        });

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const publicAdmin = username => {
        // console.log('publicAdmin:', username);
        socketRef.current.emit(ADMIN_ONLINE, username);
    };

    // 離開聊天室
    // const closeChatroom = roomId => {
    //     // setIsOpen(false);
    //     console.log('closeChatroom:', roomId);

    //     // close client any chatroom
    //     let array = [...arrAdmin]; // make a separate copy of the array
    //     let index = array.indexOf(roomId);
    //     if (index !== -1) {
    //         array.splice(index, 1);
    //         setArrAdmin(array);
    //     }

    //     //向 Server 送出申請中斷的訊息，讓它通知其他 Client
    //     socketRef.current.disconnect();
    // };

    return { isAdmin, publicAdmin };
};

export default PublicOnline;
