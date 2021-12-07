import React, { createContext, useState, useContext } from 'react';

import {
    CheckCircleOutlined, // 成功
    InfoCircleOutlined, // 提醒
    WarningOutlined, // 警告
    StopOutlined, // 失敗
    CloseCircleOutlined // 關閉
} from '@ant-design/icons';

// DesignSystem
import ButtonV1 from 'components/DesignSystem/ButtonV1';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

export const popWindowStorage = createContext();

export const withPopWindowProvider = WrappedComponent => {
    const PopWindowProvider = props => {
        const [isPopData, setIsData] = useState(null);

        const openOrompt = obj => {
            setIsData(obj);
        };

        const close = () => {
            setIsData(null);
        };

        const popWindowData = {
            isPopData,
            openOrompt,
            close
        };

        return (
            <popWindowStorage.Provider value={popWindowData}>
                <WrappedComponent {...props} />
            </popWindowStorage.Provider>
        );
    };

    return PopWindowProvider;
};

export const PopWindow = () => {
    const objData = useContext(popWindowStorage);
    const { isPopData, close } = objData;

    const StateHandle = () => {
        switch (isPopData.state) {
            case 'success':
                return <CheckCircleOutlined style={{ fontSize: '70px', color: '#0ca' }} />;
            case 'info':
                return <InfoCircleOutlined style={{ fontSize: '70px', color: '#0ca' }} />;
            case 'warning':
                return <WarningOutlined style={{ fontSize: '70px', color: '#0ca' }} />;
            case 'stop':
                return <StopOutlined style={{ fontSize: '70px', color: '#0ca' }} />;
            default:
                return <></>;
        }
    };

    const Button = () => {
        return isPopData?.button?.map((elm, index) => (
            <div
                key={index}
                className={cx('btn')}
                onClick={() => {
                    elm.callback && elm.callback();
                    close();
                }}
            >
                <ButtonV1 name={elm.name} />
            </div>
        ));
    };

    if (isPopData) {
        return (
            <div className={cx('popAnimateContainer')}>
                <div className={cx('card')}>
                    <div className={cx('inner')}>
                        <StateHandle />
                        <p className={cx('info')}>{isPopData.title}</p>
                        <p className={cx('desc')}>{isPopData.desc}</p>
                    </div>

                    <Button />
                </div>
            </div>
        );
    }
    return null;
};

export const withPopWindowConsumer = WrappedComponent => props => {
    return (
        <popWindowStorage.Consumer>
            {values => {
                return <WrappedComponent {...props} popWindowData={values} />;
            }}
        </popWindowStorage.Consumer>
    );
};
