import React from 'react';
import { withRouter } from 'react-router-dom';

// css
import classes from './style_module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Tab = ({ match, history, location, pathData }) => {
    return (
        <div className={cx('box')}>
            {pathData.map((data, index) => {
                return (
                    <div
                        className={cx('inner', data.path === match.params.param && 'tagHover')}
                        key={index}
                        onClick={() => {
                            history.push({
                                ...location,
                                pathname: `/animate/${data.path}`
                            });
                        }}
                    >
                        {data.title}
                    </div>
                );
            })}
        </div>
    );
};

export default withRouter(Tab);
