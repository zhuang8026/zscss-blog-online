import React, { useState, useContext } from 'react';

import { EnterOutlined } from '@ant-design/icons';

// DesignSystem
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

    const youtubeList = [
        {
            img: 'https://i.ytimg.com/vi/21qNxnCS8WU/0.jpg',
            url: 'https://www.youtube.com/watch?v=21qNxnCS8WU'
        },
        {
            img: 'https://i.ytimg.com/vi/36YnV9STBqc/0.jpg',
            url: 'https://www.youtube.com/watch?v=36YnV9STBqc'
        },
        {
            img: 'https://i.ytimg.com/vi/Dx5qFachd3A/0.jpg',
            url: 'https://www.youtube.com/watch?v=Dx5qFachd3A'
        }
    ];

    const openVideo = url => {
        openAnimate({
            component: (
                <div className={cx('card')}>
                    <div className={cx('icon')} onClick={() => closeAnimate()}>
                        <EnterOutlined style={{ color: '#fff', fontSize: '30px' }} />
                    </div>

                    <div className={cx('inner')}>
                        <div className={cx('video')}>
                            <ReactPlayer url={url} controls={true} width="100%" height="100%" />
                        </div>
                    </div>
                </div>
            )
        });
    };

    return (
        <>
            <div className={cx('youtube')}>
                {youtubeList.map((data, index) => {
                    return (
                        <div className={cx('lsit')} onClick={() => openVideo(data.url)} key={index}>
                            <img src={data.img} />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default OpenYoutube;
