import React, { useState, useEffect, useRef } from 'react';

// Software package
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

import './style_module.scss';

const PrismCode = ({ code }) => {
    const Pre = styled.pre`
        text-align: left;
        padding: 10px;
        border-radius: 10px;
        margin: 10px auto;
        background-color: #051d35c0 !important;
        font-size: 14px;
    `;

    const Line = styled.div`
        display: table-row;
    `;

    const LineNo = styled.span`
        display: table-cell;
        text-align: right;
        padding-right: 1em;
        user-select: none;
        opacity: 0.5;
    `;

    const LineContent = styled.span`
        display: table-cell;
    `;

    return (
        <>
            <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <Pre className={className} style={style}>
                        {tokens.map((line, i) => (
                            <Line key={i} {...getLineProps({ line, key: i })}>
                                <LineNo>{i + 1}</LineNo>
                                <LineContent>
                                    {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token, key })} />
                                    ))}
                                </LineContent>
                            </Line>
                        ))}
                    </Pre>
                )}
            </Highlight>
            <div className="prism_text">
                {code.is_Exp ? (
                    <>
                        {code.is_Exp.split('\n').map(data => (
                            <p>
                                {RegExp(/http/).exec(data) ? (
                                    <a className="prism_link" href={data} target="_blank">
                                        {data} [資料來源]
                                    </a>
                                ) : (
                                    data
                                )}
                            </p>
                        ))}
                    </>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default PrismCode;
