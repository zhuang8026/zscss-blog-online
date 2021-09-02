import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

// components
import Note from 'components/pages/Animate/ReduxHooksTodoList/Note';

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
            <Note />
        </div>
    );
};

export default App;
