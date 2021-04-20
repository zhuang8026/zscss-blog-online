import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Redirect, Link } from 'react-router-dom';

// css
// import classes from './style_module.scss';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(classes);
import './style_module.scss';

class DragTableClass extends React.Component {
    state = {
        tasks: [
            { name: 'AAAA', category: 'wip', bgcolor: '#9F353A' },
            { name: 'BBBB', category: 'wip', bgcolor: '#A96360' },
            { name: 'CCCC', category: 'complete', bgcolor: '#CB4042' },
            { name: 'DDDD', category: 'complete', bgcolor: '#AB3B3A' }
        ]
    };

    onDragStart = (ev, id) => {
        console.log('dragstart:', id);
        ev.dataTransfer.setData('id', id);
    };

    onDragOver = ev => {
        ev.preventDefault();
    };

    onDragOverItem = ev => {
        console.log('on drop over item');
        ev.preventDefault();
    };

    onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData('id');

        let tasks = this.state.tasks.filter(task => {
            if (task.name == id) {
                task.category = cat;
            }
            return task;
        });

        this.setState({
            ...this.state,
            tasks
        });
    };
    onDropItem = (ev, cat, t) => {
        console.log(ev.target, t, cat);
        let id = ev.dataTransfer.getData('id');

        let tar = this.state.tasks.filter(task => task.name == t)[0];
        console.log('From->', id, cat, ' To->', tar.name, tar.category);
        let tasks = this.state.tasks.filter(task => {
            if (task.name == id) {
                task.category = tar.category;
            } else if (task.name == tar.name) {
                task.category = cat;
            }
            return task;
        });

        this.setState({
            ...this.state,
            tasks
        });
    };

    render() {
        var tasks = {
            wip: [],
            complete: []
        };

        this.state.tasks.forEach(t => {
            tasks[t.category].push(
                <div
                    key={t.name}
                    onDragStart={e => this.onDragStart(e, t.name)}
                    onDragOver={e => this.onDragOverItem(e)}
                    onDrop={e => this.onDropItem(e, t.category == 'complete' ? 'wip' : 'complete', t.name)}
                    draggable
                    className="draggable"
                    style={{ backgroundColor: t.bgcolor }}
                >
                    {t.name}
                </div>
            );
        });

        return (
            <div className="container-drag">
                <div
                    className="wip"
                    onDragOver={e => this.onDragOver(e)}
                    onDrop={e => {
                        this.onDrop(e, 'wip');
                    }}
                >
                    <span className="task-header">A Group</span>
                    {tasks.wip}
                </div>
                <div
                    className="droppable"
                    onDragOver={e => this.onDragOver(e)}
                    onDrop={e => this.onDrop(e, 'complete')}
                >
                    <span className="task-header">B Group</span>
                    {tasks.complete}
                </div>
            </div>
        );
    }
}

// ReactDOM.render(<DragTable />, document.getElementById('app'));

export default withRouter(DragTableClass);
