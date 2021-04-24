import React, { useState, useContext, useEffect } from 'react';

// DesignSystem
import NavTop from 'components/DesignSystem/NavTop';
import HeaderTitle from 'components/DesignSystem/HeaderTitle';
import AdminList from 'components/DesignSystem/AdminList';
import ChatRoom from 'components/DesignSystem/Socket/ChatRoom';
import ChatRoomAdmin from 'components/DesignSystem/Socket/ChatRoomAdmin';
import useChat from 'components/DesignSystem/Socket/useChat';
import PublicOnline from 'components/DesignSystem/Socket/PublicOnline';

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
    const [arrUserChat, setArrUserChat] = useState([]); // 紀錄有多少聊天室

    const { arrayChat } = useChat(); // Creates a websocket and manages messaging
    const { isAdmin, publicAdmin } = PublicOnline(); // admin online

    // console.log 專區
    console.log('adminData:', adminData);
    console.log('arrayChat:', arrayChat);
    console.log('isAdmin:', isAdmin);

    const handleRoomNameChange = (adminId, adminName, adminImg) => {
        let createRoom = {
            roomId: getRandomMember(),
            adminId: adminId,
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

    useEffect(() => {
        let adminName = adminData[0]?.all?.nickname;
        if (isAdminOpen) publicAdmin(adminName);
    }, []);

    useEffect(() => {
        if (isAdmin != '') openAdminNotification(isAdmin);
    }, [isAdmin]);
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
