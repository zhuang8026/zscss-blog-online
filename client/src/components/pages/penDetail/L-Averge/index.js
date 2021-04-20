import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

import { from } from 'rxjs';

// API
import axios from 'axios';
import { ratingAllAPI } from 'api/products';

// antd
import { Rate } from 'antd'; // 星星

const Averge = ({ penStar }) => {
    const [isLoading, setIsLoading] = useState(true); // 載入
    const [isStar, setIsStar] = useState([]); // 全部評分
    const [isRating, setIsRating] = useState(0.0); // 平均分

    const fetchListener = useRef(null); // fetch

    const ratingAllAPICallBack = () => {
        fetchListener.current = from(axios(ratingAllAPI('GET'))).subscribe(res => {});
    };

    // 評分
    useEffect(() => {
        ratingAllAPICallBack();
    }, []);

    //  取消監聽
    useEffect(() => {
        // if (fetchListener.current) fetchListener.current.unsubscribe();
        return () => {
            if (fetchListener.current) {
                fetchListener.current.unsubscribe();
            }
        };
    }, []);

    return (
        <div className="rating_card Averge">
            <div className="card_title">Averge Rating</div>
            <div className="card_rating">
                <div className="rating_all">
                    <h1>{penStar?.toFixed(1)}</h1>
                    <div className="rating_all_star">
                        <Rate disabled allowHalf defaultValue={0} value={penStar?.toFixed(1)} />
                        {/* <div>({isStar.length} 次評分)</div> */}
                    </div>
                </div>
            </div>
            <div className="rating_list">
                <ul>
                    <li># React快速學習法</li>
                    <li># React快速學習法</li>
                    <li># React快速學習法</li>
                    <li># React快速學習法</li>
                    <li># React快速學習法</li>
                </ul>
                <div className="rating_more">...more</div>
            </div>
        </div>
    );
};

export default Averge;
