import React, { useState, useContext } from 'react';

import { FullWindowAnimateStorage } from 'components/DesignSystem/FullWindow';

// layout
import ReactPlayer from 'react-player';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

// https://www.youtube.com/watch?v=21qNxnCS8WU
const OpenYoutube = () => {
    const { closeAnimate, openAnimate } = useContext(FullWindowAnimateStorage);

    // const [isData, setIsData] = useState();

    const openVideo = () => {
        openAnimate({
            component: (
                <div className={cx('card')}>
                    <div className={cx('icon')} onClick={() => closeAnimate()} />
                    <div className={cx('inner')}>
                        <div className={cx('video')}>
                            <ReactPlayer
                                url="https://www.youtube.com/watch?v=21qNxnCS8WU"
                                controls={true}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                </div>
            )
        });
    };

    return (
        <>
            <div className={cx('youtube')} onClick={() => openVideo()}>
                <div className={cx('lsit')}>
                    <img src="https://i.ytimg.com/vi/21qNxnCS8WU/0.jpg" />
                </div>
            </div>
        </>
    );
};

export default OpenYoutube;
