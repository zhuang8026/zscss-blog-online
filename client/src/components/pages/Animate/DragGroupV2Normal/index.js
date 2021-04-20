import React, { useState, useEffect } from 'react';

// DesignSystem
import PrismCode from 'components/DesignSystem/PrismCode';
import text from './text.json';

// css
import './style_module.scss';

const data = [
    { name: 'RD', category: 'A', bgcolor: '#AB3B3A' },
    { name: 'SA', category: 'A', bgcolor: '#C18A26' },
    { name: 'HR', category: 'A', bgcolor: '#36563C' },
    { name: 'PM', category: 'A', bgcolor: '#0B1013' }
];

const DragGroupV2Normal = ({ component }) => {
    const [isDrag, setIsDrag] = useState([]);
    const [isKey, setIsKey] = useState();

    // ------ 第一層(父) ------
    // 拖動
    const onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData('name'); // 取得Dom中的data

        let drag = isDrag.filter(drg => {
            if (drg.name == id) {
                drg.category = cat;
            }
            return drg;
        });
        setIsDrag(drag);
    };

    //Element正在拖動到放置目标时出發
    const onDragOver = ev => {
        // console.log('on drop over div');
        ev.preventDefault();
    };

    // ------ 第二層(子) ------
    // 当某被拖动的对象在另一对象容器
    const onDragStart = (ev, id, index) => {
        ev.dataTransfer.setData('name', id);
        setIsKey(index);
    };

    const onDropItem = (event, name, index) => {
        let id = event.dataTransfer.getData('name');
        console.log(isKey + '->' + id); // 被移動元素
        console.log(index + '->' + name); // 被替換元素
        let origin = isDrag[isKey];
        isDrag[isKey] = isDrag[index];
        isDrag[index] = origin;
        setIsDrag(isDrag);
    };

    const onDragOverItem = (event, name, index) => {
        event.preventDefault();
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
                    onDrop(e);
                }}
            >
                {isDrag.map((data, index) => {
                    return (
                        <div
                            key={data.name}
                            onDragStart={event => onDragStart(event, data.name, index)}
                            onDragOver={event => onDragOverItem(event, data.name, index)}
                            onDrop={event => onDropItem(event, data.name, index)}
                            draggable="true" // 控制drag開關
                            className="draggable"
                            style={{ backgroundColor: data.bgcolor }}
                        >
                            {data.name}
                        </div>
                    );
                })}
            </div>

            <PrismCode code={text.pen_content.replace(/↵/g, '\n')} />
        </div>
    );
};

export default DragGroupV2Normal;
