import React, { useState, createContext } from 'react';

export const DragContext = createContext();

const DragProvider = props => {
    const [isDrag, setIsDrag] = useState([]);
    const [isKey, setIsKey] = useState();

    const onDragStart = (ev, id, index) => {
        ev.dataTransfer.setData('name', id);
        setIsKey(index);
    };

    //Element正在拖動到放置目标时出發
    const onDragOver = ev => {
        // console.log('on drop over div');
        ev.preventDefault();
    };

    // 当某被拖动的对象在另一对象容器
    const onDragOverItem = (event, name, index) => {
        event.preventDefault();
    };

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

    const onDropItem = (event, name, index) => {
        let id = event.dataTransfer.getData('name');
        console.log(isKey + '->' + id); // 被移動元素
        console.log(index + '->' + name); // 被替換元素
        let origin = isDrag[isKey];
        isDrag[isKey] = isDrag[index];
        isDrag[index] = origin;
        setIsDrag(isDrag);
    };

    const domHandle = () => {
        return isDrag.map((data, index) => {
            return (
                <div
                    key={data.name}
                    onDragStart={event => onDragStart(event, data.name, index)}
                    onDragOver={event => onDragOverItem(event, data.name, index)}
                    onDrop={event => onDropItem(event, data.name, index)}
                    draggable={true} // 控制drag開關
                    className="draggable"
                    style={{ backgroundColor: data.bgcolor }}
                    onClick={() => {
                        console.log('click');
                    }}
                >
                    <div>{data.name}</div>
                </div>
            );
        });
    };

    const GroupHandle = () => {
        return (
            <div
                className="wip"
                onDragOver={e => {
                    onDragOver(e);
                }}
                onDrop={e => {
                    onDrop(e);
                }}
            >
                {/* <span className="task-header">A Group</span> */}
                {domHandle()}
            </div>
        );
    };

    return (
        <DragContext.Provider
            value={{
                ...props,
                isDrag,
                setIsDrag,
                onDrop,
                onDragOver,
                domHandle,
                GroupHandle
            }}
        >
            {props.children}
        </DragContext.Provider>
    );
};

export default DragProvider;
