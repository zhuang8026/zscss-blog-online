import React, { useState, useContext } from 'react';

// DesignSystem
import NavTop from 'components/DesignSystem/NavTop';
import HeaderTitle from 'components/DesignSystem/HeaderTitle';
import AdminList from 'components/DesignSystem/AdminList';
import UserChat from 'components/DesignSystem/Chat/UserChat';
import AdminChat from 'components/DesignSystem/Chat/AdminChat';

// components
import Averge from 'components/pages/Home/L-Averge';
import Comments from 'components/pages/Home/L-Comments';
import CardList from 'components/pages/Home/R-CardList';

// Context
import { AdminContext } from 'contexts/admin';

import './style_module.scss';

const Home = () => {
    const { adminData, unsetLoggedInMember } = useContext(AdminContext);
    const adminOnline = adminData[0]?.all?.loginStatus;
    const [isOpen, setIsOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    // console.log 專區
    console.log('adminData:', adminData);

    return (
        <main>
            {/* 路人甲 */}
            {isOpen && <UserChat isOpen={isOpen} setIsOpen={setIsOpen} />}
            {/* 管理員 */}
            {adminOnline && <AdminChat isOpen={isOpen} setIsOpen={setIsOpen} />}
            <NavTop />
            <HeaderTitle />
            <div className="rating_body">
                {/* left container */}
                <div className="rating_l_card">
                    <Averge />
                    <Comments />
                    <AdminList isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>

                {/* right container */}
                <CardList />
            </div>
        </main>
    );
};

export default Home;
