import React from 'react';
import { withRouter } from 'react-router-dom';

// css
// import classes from './style_module.scss';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(classes);

const Tab = ({ history, location, pathData }) => {

    return (
        <div className="box">
            {pathData.map((data, index) => {
                return (
                    <div
                        className="inner"
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
