import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

import { from } from 'rxjs';

// API
import axios from 'axios';
import { ratingAllAPI } from 'api/products';

// antd
import { Rate } from 'antd'; // 星星
import { Progress } from 'antd'; // 進度條
import { StarFilled } from '@ant-design/icons';

const Averge = () => {
    const [isLoading, setIsLoading] = useState(true); // 載入
    const [isStar, setIsStar] = useState([]); // 全部評分
    const [isRating, setIsRating] = useState(0.0); // 平均分
    const [one, setOne] = useState(0); // 1 star
    const [two, setTwo] = useState(0); // 2 star
    const [three, setThree] = useState(0); // 3 star
    const [four, setFour] = useState(0); // 4 star
    const [five, setFive] = useState(0); // 5 star
    const fetchListener = useRef(null); // fetch
    let i = 0; // 1~5 總加
    let s = 0; // 1
    let ss = 0; // 2
    let sss = 0; // 3
    let ssss = 0; // 4
    let sssss = 0; // 5

    const ratingAllAPICallBack = () => {
        fetchListener.current = from(axios(ratingAllAPI('GET'))).subscribe(res => {
            setTimeout(() => {
                setIsLoading(false);
                setIsStar(res.data[0]);

                res.data[0].map((data, index) => {
                    i += data.itemStar;
                    switch (data.itemStar) {
                        case 1:
                            s += data.itemStar;
                            break;
                        case 2:
                            ss += data.itemStar;
                            break;
                        case 3:
                            sss += data.itemStar;
                            break;
                        case 4:
                            ssss += data.itemStar;
                            break;
                        case 5:
                            sssss += data.itemStar;
                            break;
                    }
                });
                setOne(s / i);
                setTwo(ss / i);
                setThree(sss / i);
                setFour(ssss / i);
                setFive(sssss / i);
                setIsRating(i / res.data[0].length);
            }, 1000);
        });
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
                    <h1>{isRating.toFixed(1)}</h1>
                    <div className="rating_all_star">
                        <Rate disabled allowHalf defaultValue={0} value={isRating.toFixed(1)} />
                        <div>({isStar.length} 次評分)</div>
                    </div>
                </div>
            </div>
            <div className="rating_number_list">
                <div className="rating_number">
                    <div className="rating_info">
                        <div className="star">
                            <p>
                                5 <StarFilled className="icon_star" />
                            </p>
                        </div>
                        <span>({parseInt(five * 100)}%)</span>
                    </div>
                    <div className="rating_line">
                        <Progress
                            strokeColor={{
                                '0%': '#0073e6',
                                '100%': '#0ca'
                            }}
                            percent={parseInt(five * 100)}
                            status="active"
                            showInfo={false}
                        />
                    </div>
                </div>
                <div className="rating_number">
                    <div className="rating_info">
                        <div className="star">
                            <p>
                                4 <StarFilled className="icon_star" />
                            </p>
                        </div>
                        <span>({parseInt(four * 100)}%)</span>
                    </div>
                    <div className="rating_line">
                        <Progress
                            strokeColor={{
                                '0%': '#0073e6',
                                '100%': '#0ca'
                            }}
                            percent={parseInt(four * 100)}
                            status="active"
                            showInfo={false}
                        />
                    </div>
                </div>
                <div className="rating_number">
                    <div className="rating_info">
                        <div className="star">
                            <p>
                                3 <StarFilled className="icon_star" />
                            </p>
                        </div>
                        <span>({parseInt(three * 100)}%)</span>
                    </div>
                    <div className="rating_line">
                        <Progress
                            strokeColor={{
                                '0%': '#0073e6',
                                '100%': '#0ca'
                            }}
                            percent={parseInt(three * 100)}
                            status="active"
                            showInfo={false}
                        />
                    </div>
                </div>
                <div className="rating_number">
                    <div className="rating_info">
                        <div className="star">
                            <p>
                                2 <StarFilled className="icon_star" />
                            </p>
                        </div>
                        <span>({parseInt(two * 100)}%)</span>
                    </div>
                    <div className="rating_line">
                        <Progress
                            strokeColor={{
                                '0%': '#0073e6',
                                '100%': '#0ca'
                            }}
                            percent={parseInt(two * 100)}
                            status="active"
                            showInfo={false}
                        />
                    </div>
                </div>
                <div className="rating_number">
                    <div className="rating_info">
                        <div className="star">
                            <p>
                                1 <StarFilled className="icon_star" />
                            </p>
                        </div>
                        <span>({parseInt(one * 100)}%)</span>
                    </div>
                    <div className="rating_line">
                        <Progress
                            strokeColor={{
                                '0%': '#0073e6',
                                '100%': '#0ca'
                            }}
                            percent={parseInt(one * 100)}
                            status="active"
                            showInfo={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Averge;
