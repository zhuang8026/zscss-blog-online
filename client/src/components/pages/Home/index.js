import React, { useState, useContext, useEffect } from 'react';

// DesignSystem
import NavTop from 'components/DesignSystem/NavTop';
import HeaderTitle from 'components/DesignSystem/HeaderTitle';
import AdminList from 'components/DesignSystem/AdminList';
import ChatRoom from 'components/DesignSystem/Socket/ChatRoom';
import ChatRoomAdmin from 'components/DesignSystem/Socket/ChatRoomAdmin';
import useChat from 'components/DesignSystem/Socket/useChat';

// components
import Averge from 'components/pages/Home/L-Averge';
import Comments from 'components/pages/Home/L-Comments';
import CardList from 'components/pages/Home/R-CardList';

// Context
import { AdminContext } from 'contexts/admin';

import './style_module.scss';

const Home = () => {
    const { adminData, unsetLoggedInMember, openAdminNotification } = useContext(AdminContext);
    const isAdminOpen = adminData[0]?.all?.loginStatus;

    const [isOpen, setIsOpen] = useState(false);
    const [roomData, setRoomData] = useState(); // create new chatroom
    const [arrUserChat, setArrUserChat] = useState([]); // 紀錄chatroom id / array

    const { arrayChat, setArrayChat, closeChatroom } = useChat(); // Creates a websocket and manages messaging

    const handleRoomNameChange = (adminId, adminName, adminImg) => {
        let createRoom = {
            roomId: getRandomMember(),
            adminId: adminId,
            adminName: adminName,
            adminImg: adminImg
        };
        setRoomData(createRoom);
    };

    const getRandomMember = () => {
        let createRoomId = Math.floor(Math.random() * 1000);

        if (arrUserChat.includes(createRoomId)) {
            return getRandomMember();
        } else {
            arrUserChat.push(createRoomId);
            setArrUserChat(arrUserChat);
            return createRoomId;
        }
    };

    const closeUsersChatroomFun = roomId => {
        closeChatroom(roomId);
    };

    const closeAdminChatroomFun = roomId => {
        // close client any chatroom
        let array = [...arrayChat]; // make a separate copy of the array
        let index = array.indexOf(roomId);
        if (index !== -1) {
            array.splice(index, 1);
            setArrayChat(array);
        }
    };

    return (
        <main>
            {/* 路人甲 */}
            <div className="userChatroom_body">
                {isOpen && (
                    <ChatRoom roomData={roomData} setIsOpen={setIsOpen} closeUsersChatroomFun={closeUsersChatroomFun} />
                )}
            </div>

            {/* 管理員 */}
            <div className="adminChatroom_body">
                {isAdminOpen &&
                    arrayChat.length > 0 &&
                    arrayChat.map((roomId, index) => {
                        let createRoom = {
                            roomId: roomId,
                            adminName: adminData[0]?.all?.nickname,
                            adminImg: adminData[0]?.all?.userimg
                        };
                        return <ChatRoomAdmin roomData={createRoom} closeAdminChatroomFun={closeAdminChatroomFun} />;
                    })}
            </div>

            <NavTop />
            <HeaderTitle />
            <div className="rating_body">
                {/* left container */}
                <div className="rating_l_card">
                    <Averge />
                    <Comments />
                    <AdminList isOpen={isOpen} setIsOpen={setIsOpen} openChat={handleRoomNameChange} />
                </div>

                {/* right container */}
                <CardList />
            </div>
        </main>
    );
};

export default Home;
