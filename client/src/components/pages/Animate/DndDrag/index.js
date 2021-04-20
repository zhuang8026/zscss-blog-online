import React, { useState, useEffect, useRef, Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DndDrag = () => {
    const [items, setItems] = useState([
        {
            id: `item-1`,
            content: `this is content 1`
        },
        {
            id: `item-2`,
            content: `this is content 2`
        },
        {
            id: `item-3`,
            content: `this is content 3`
        }
    ]);

    // 重新记录数组顺序
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        //删除并记录 删除元素
        const [removed] = result.splice(startIndex, 1);

        // console.log('removed:', removed);

        //将原来的元素添加进数组
        result.splice(endIndex, 0, removed);
        return result;
    };

    // 拖拽settin
    const onDragEnd = result => {
        if (!result.destination) {
            return;
        }
        // console.log(result);
        const itemsData = reorder(items, result.source.index, result.destination.index);
        // console.log('items:', items);
        setItems(itemsData);
    };

    const grid = 8;

    // 设置样式
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // 拖拽的时候背景变化
        background: isDragging ? '#005CAF' : '#3A8FB7',

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = () => ({
        background: '#0F2540',
        padding: grid,
        width: 250
    });

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <center>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            //provided.droppableProps应用的相同元素.
                            {...provided.droppableProps}
                            // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                            ref={provided.innerRef}
                            style={getListStyle(snapshot)}
                        >
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={false}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                        >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {/* 占位符号 */}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </center>
        </DragDropContext>
    );
};

export default DndDrag;
