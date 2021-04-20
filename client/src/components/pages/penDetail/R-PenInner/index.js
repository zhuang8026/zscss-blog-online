import React, { useState, useEffect, useRef, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import posed from 'react-pose';

// API
// import axios from 'axios';
// import { detailPenAPI } from 'api/products';

// DesignSystem
import LoadingV2 from 'components/DesignSystem/LoadingV2';
import PrismCode from 'components/DesignSystem/PrismCode';
import PenText from 'components/DesignSystem/PenText';

// antd
import { Select } from 'antd';
import { Result, Button } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import { FolderOpenOutlined } from '@ant-design/icons';

// Context
import { AdminContext } from 'contexts/admin';

const ItemAnimated = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
});

const CardList = ({ history, location, match }) => {
    const [contentLoad, setContentLoad] = useState(false); // 動畫控制
    const [isPage, setIsPage] = useState(1); // 頁碼
    const [isStar, setIsStar] = useState(0); // rating 數量
    const [isData, setIsData] = useState([]); // 此頁資料
    const fetchListener = useRef(null); // fetch
    const btnElement = useRef(null);
    const { Option } = Select;

    const { isLoading, detailData, detailPenAPIHandle } = useContext(AdminContext);

    // console.log 專區
    // console.log(detailData);

    // const handleChange = value => {
    //     // console.log(`selected: ${value}`);
    //     setIsStar(value);
    //     setIsPage(1);
    // };

    useEffect(() => {
        detailPenAPIHandle({ id: match.params.id });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setContentLoad(true);
        }, 100);
    }, []);

    // useEffect(() => {
    //     productsPagesAPICallBack();
    // }, [isPage, isStar]);

    if (isLoading) {
        return (
            <div className="rating_r_list_all">
                <LoadingV2 />
            </div>
        );
    }

    if (detailData.status === 'ND001') {
        return (
            <div className="rating_r_list_all">
                <div className="rating_r_list_d">
                    <Result title="sorry... data under construction" icon={<FolderOpenOutlined />} />
                </div>
            </div>
        );
    }

    return (
        <div className="rating_r_list_all">
            <ItemAnimated pose={contentLoad ? 'visible' : 'hidden'}>
                <div className="rating_r_list_d">
                    <div className="rating_list_inner">
                        {/* <h1>
                            <ThunderboltFilled />. {detailData.penTitle}
                        </h1> */}
                        {/* // - Null- Undefined↵- Boolean↵- Number↵- BigInt↵- String↵- Symbol */}
                        {detailData.penBlock?.map((data, index) => {
                            return (
                                <p>
                                    <b>{data.pen_title}</b>
                                    {data.pen_code === 0 ? (
                                        <PenText text={data.is_text.trim()} />
                                    ) : (
                                        <PrismCode code={data.is_text.replace(/↵/g, '\n')} />
                                    )}
                                </p>
                            );
                        })}
                    </div>
                </div>
                <div className="rating_chat">
                    <h1>COME SOON</h1>
                    <div className="LL"></div>
                    <div className="LL"></div>
                    <div className="RR"></div>
                    <div className="RR"></div>
                    <div className="RR"></div>
                </div>
            </ItemAnimated>
        </div>
    );
};

export default withRouter(CardList);
