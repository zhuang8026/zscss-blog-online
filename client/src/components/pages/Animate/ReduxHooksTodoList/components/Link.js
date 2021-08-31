import React from 'react';
import PropTypes from 'prop-types';

// css
import classes from '../style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Link = props => {
    const { active, children, onClick } = props;
    // console.log(props);
    if (active) {
        return <span className={cx('blue')}>{children}</span>;
    }

    return (
        <a
            href="#"
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
        >
            {children}
        </a>
    );
};

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link;
