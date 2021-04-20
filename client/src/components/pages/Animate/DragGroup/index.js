import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

// DesignSystem
import PrismCode from 'components/DesignSystem/PrismCode';
import text from './text.json';

// Context
import DragProvider, { DragContext } from './Context/context_drag.js';

// css
import './style_module.scss';

const data = [
    { name: 'RD', category: 'A', bgcolor: '#AB3B3A' },
    { name: 'SA', category: 'A', bgcolor: '#C18A26' },
    { name: 'HR', category: 'A', bgcolor: '#36563C' },
    { name: 'PM', category: 'A', bgcolor: '#0B1013' }
];

const Index = () => {
    return (
        <DragProvider>
            <DragGroup></DragGroup>
        </DragProvider>
    );
};

const DragGroup = () => {
    const { isDrag, setIsDrag, onDrop, onDragOver, domHandle, GroupHandle } = useContext(DragContext);

    useEffect(() => {
        setIsDrag([...data]);
    }, []);

    return (
        <div className="container-drag">
            {/* A Group */}
            {GroupHandle()}
            <PrismCode code={text.pen_content.replace(/↵/g, '\n')} />
        </div>
    );
};

export default withRouter(Index);
