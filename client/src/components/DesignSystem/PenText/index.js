import React, { useState, useEffect, useRef } from 'react';

// Software package
import Highlight, { defaultProps } from 'prism-react-renderer';

import './style_module.scss';

const PenText = ({ text }) => {
    return <span className="list_p">{text.replace('\n', '\n')}</span>;
};

export default PenText;
