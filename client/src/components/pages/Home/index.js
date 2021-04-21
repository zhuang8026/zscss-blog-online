import React, { useState } from 'react';

// DesignSystem
import NavTop from 'components/DesignSystem/NavTop';
import HeaderTitle from 'components/DesignSystem/HeaderTitle';
import AdminList from 'components/DesignSystem/AdminList';
import Chat from 'components/DesignSystem/Chat';

// components
import Averge from 'components/pages/Home/L-Averge';
import Comments from 'components/pages/Home/L-Comments';
import CardList from 'components/pages/Home/R-CardList';

import './style_module.scss';

const Home = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <main>
            {isOpen && <Chat isOpen={isOpen} setIsOpen={setIsOpen} />}
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
