import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

// css
import classes from '../style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const App = props => {
    return (
        <div className={cx('main')}>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    );
};

export default App;
