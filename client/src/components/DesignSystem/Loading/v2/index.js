import React, { useState, useEffect, useRef } from 'react';
// import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
// import { Rate } from 'antd';
// import { CloudUploadOutlined } from '@ant-design/icons';

import './style_module.scss';

const Loading = () => {
    return (
        <div className="r_list">
            <div className="r_list_card">
                <div className="r_list_bottom">
                    <div className="r_list_star right_loading_color">
                        {/* <Rate disabled allowHalf defaultValue={3.5} /> */}
                    </div>
                    <div className="r_list_tag right_loading_color">
                        {/* <span>#太棒了</span> */}
                        {/* <span>#非常有幫助</span> */}
                    </div>
                    <div className="r_list_tag_content r_list_tag_content_color"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
