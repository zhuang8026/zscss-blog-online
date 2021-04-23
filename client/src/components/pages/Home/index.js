import React, { useState, useContext } from 'react';

// DesignSystem
import NavTop from 'components/DesignSystem/NavTop';
import HeaderTitle from 'components/DesignSystem/HeaderTitle';
import AdminList from 'components/DesignSystem/AdminList';
import ChatRoom from 'components/DesignSystem/Chat/ChatRoom';
import ChatRoomAdmin from 'components/DesignSystem/Chat/ChatRoomAdmin';

// components
import Averge from 'components/pages/Home/L-Averge';
import Comments from 'components/pages/Home/L-Comments';
import CardList from 'components/pages/Home/R-CardList';
import useChat from '../../DesignSystem/Chat/useChat';
// Context
import { AdminContext } from 'contexts/admin';

import './style_module.scss';

const Home = () => {
    const { adminData, unsetLoggedInMember } = useContext(AdminContext);
    const isAdminOpen = adminData[0]?.all?.loginStatus;
    const [isOpen, setIsOpen] = useState(false);
    const [roomData, setRoomData] = useState(); // create new chatroom
    const [arrUserChat, setArrUserChat] = useState([]); // 紀錄有多少聊天室

    const { arrayChat } = useChat(); // Creates a websocket and manages messaging

    // console.log 專區
    console.log('adminData:', adminData);
    console.log('arrayChat:', arrayChat);

    const handleRoomNameChange = (adminName, adminImg) => {
        let createRoom = {
            roomId: getRandomMember(),
            adminName: adminName,
            adminImg: adminImg
        };
        console.log('home-createRoom:', createRoom);
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

    return (
        <main>
            {/* 路人甲 */}
            {isOpen && <ChatRoom roomData={roomData} setIsOpen={setIsOpen} />}

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
                        return <ChatRoomAdmin roomData={createRoom} />;
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
