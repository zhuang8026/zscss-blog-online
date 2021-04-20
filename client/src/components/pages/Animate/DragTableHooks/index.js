import React, { useState, useEffect, useRef, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// css
import './style_module.scss';

const data = [
    { name: 'AAAA', category: 'wip', bgcolor: '#376B6D' },
    { name: 'BBBB', category: 'wip', bgcolor: '#7BA23F' },
    { name: 'CCCC', category: 'complete', bgcolor: '#86C166' },
    { name: 'DDDD', category: 'complete', bgcolor: '#24936E' }
];


const DragTableHooks = () => {
    const [isDrag, setIsDrag] = useState([]);

    const onDragStart = (ev, id) => {
        console.log('dragstart:', id);
        ev.dataTransfer.setData('id', id);
    };

    const onDragOver = ev => {
        ev.preventDefault();
    };

    const onDragOverItem = ev => {
        console.log('on drop over item');
        ev.preventDefault();
    };

    const onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData('id');

        let drag = isDrag.filter(drg => {
            if (drg.name == id) {
                drg.category = cat;
            }
            return drg;
        });
        setIsDrag(drag);
    };

    const onDropItem = (ev, cat, t) => {
        console.log(ev.target, t, cat);
        let id = ev.dataTransfer.getData('id');

        let tar = isDrag.filter(task => task.name == t)[0];
        console.log('From->', id, cat, ' To->', tar.name, tar.category);
        let drag = isDrag.filter(drg => {
            if (drg.name == id) {
                drg.category = tar.category;
            } else if (drg.name == tar.name) {
                drg.category = cat;
            }
            return drg;
        });

        setIsDrag(drag);
    };

    const domHandle = categoryData => {
        return isDrag.map(data => {
            if (data.category === categoryData) {
                return (
                    <div
                        key={data.name}
                        onDragStart={e => onDragStart(e, data.name)}
                        onDragOver={e => onDragOverItem(e)}
                        onDrop={e => onDropItem(e, data.category == 'complete' ? 'wip' : 'complete', data.name)}
                        draggable
                        className="draggable"
                        style={{ backgroundColor: data.bgcolor }}
                    >
                        {data.name}
                    </div>
                );
            }
        });
    };

    useEffect(() => {
        setIsDrag([...data]);
    }, []);

    return (
        <div className="container-drag">
            <div
                className="wip"
                onDragOver={e => {
                    onDragOver(e);
                }}
                onDrop={e => {
                    onDrop(e, 'wip');
                }}
            >
                <span className="task-header">A Group</span>
                {domHandle('wip')}
            </div>

            <div
                className="droppable"
                onDragOver={e => {
                    onDragOver(e);
                }}
                onDrop={e => {
                    onDrop(e, 'complete');
                }}
            >
                <span className="task-header">B Group</span>
                {domHandle('complete')}
            </div>
        </div>
    );
};

export default withRouter(DragTableHooks);
