import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { Result, Button } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';

const NoData = () => {
    return (
        <div className="rating_r_list_d">
            <Result title="sorry... data under construction" icon={<FolderOpenOutlined />} />
        </div>
    );
};

export default NoData;
