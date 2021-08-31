import React from 'react';
import FilterLink from '../containers/FilterLink';

const Footer = () => (
    <p>
        Show:
        <FilterLink filter="SHOW_ALL" test="test">
            All
            <span>-Data</span>
            {/* 在 FilterLink 內會變成 children 傳到內部*/}
        </FilterLink>
        {', '}
        <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
        {', '}
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
    </p>
);

export default Footer;
