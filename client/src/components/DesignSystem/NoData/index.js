import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { Result, Button } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';

import './style_module.scss';

const NoData = () => {
    return (
        <div className="rating_r_list_d">
            <Result title="sorry... No data found." icon={<FolderOpenOutlined />} />
        </div>
    );
};

export default NoData;
