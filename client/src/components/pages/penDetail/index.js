import React, { useState, useEffect, useRef, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// DesignSystem
import NavTop from 'components/DesignSystem/NavTop';
import HeaderTitle from 'components/DesignSystem/HeaderTitle';

// components
// import Header from 'components/pages/penDetail/L-Header';
import Averge from 'components/pages/penDetail/L-Averge';
import PenInner from 'components/pages/penDetail/R-PenInner';

// Context
import { AdminContext } from 'contexts/admin';

import './style_module.scss';

const PenDetail = () => {
    const { detailData } = useContext(AdminContext);

    return (
        <main>
            <NavTop />
            <HeaderTitle penImg={detailData.penImg} title={detailData.penTitle} />
            <div className="rating_body">
                {/* left container */}
                <div className="rating_l_card">
                    <Averge penStar={detailData.penStar} />
                </div>

                {/* right container */}
                <PenInner />
            </div>
        </main>
    );
};

export default withRouter(PenDetail);
