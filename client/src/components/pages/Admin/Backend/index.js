import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// Context
import { AdminContext } from 'contexts/admin';

import '../style_module.scss';

const Backend = ({ history }) => {
    const [username, setUsername] = useState(''); // username

    //  socket.io 全體通知
    useEffect(() => {}, []);

    return <div className="signin">backend</div>;
};

export default withRouter(Backend);
