import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

// css
import './style_module.scss';

// Hover state - https://dev.to/spaciecat/hover-states-with-react-hooks-4023
// const useHover = () => {
//     const ref = useRef();
//     const [hovered, setHovered] = useState(false);

//     const enter = () => setHovered(true);
//     const leave = () => setHovered(false);

//     useEffect(() => {
//         ref.current.addEventListener('mouseenter', enter);
//         ref.current.addEventListener('mouseleave', leave);
//         return () => {
//             ref.current.removeEventListener('mouseenter', enter);
//             ref.current.removeEventListener('mouseleave', leave);
//         };
//     }, [ref]);

//     return [ref, hovered];
// };

let options = [
    { key: 'RD', value: 'william' },
    { key: 'SA', value: 'Ryan' },
    { key: 'PM', value: 'Alex' },
    { key: 'QA', value: 'Rita' },
    { key: 'BE', value: 'Bosh' }
];

const HoverCreateElement = () => {
    const [isData, setIsData] = useState();

    return (
        <>
            <div className="HoverCreateElement">
                {options.map((data, index) => {
                    return (
                        <div
                            className="box"
                            key={index}
                            onMouseEnter={e => {
                                // HoverCreateElemFun(e);
                            }}
                        >
                            <p className="key">職位: {data.key}</p>
                            <p className="value">名稱: {data.value}</p>
                            <div className="hoverBox">我是hover</div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default HoverCreateElement;
