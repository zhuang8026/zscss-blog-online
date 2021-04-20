import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// antd
import { Rate } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

import './style_module.scss';

const LoadingV2 = () => {
    return (
        <div className="r_list">
            <div className="r_list_card">
                <div className="r_list_title">
                    <div className="r_list_title_left">
                        <div className="r_list_head">
                            <div className="figure_icon figure_icon_color">
                                {/* <img src={require(`images/Home/test.jpg`)} alt="頭像" /> */}
                            </div>
                        </div>
                        <div className="r_list_content">
                            <h2 className="right_list_title right_loading_color"></h2>
                            <p className="right_loading_color"></p>
                        </div>
                    </div>
                    <div className="r_list_title_right">
                        <CloudUploadOutlined className="icon-20" />
                    </div>
                </div>
                <div className="r_list_bottom">
                    <div className="r_list_star right_loading_color">
                        {/* <Rate disabled allowHalf defaultValue={3.5} /> */}
                    </div>
                    <div className="r_list_tag right_loading_color">
                        {/* <span>#太棒了</span> */}
                        {/* <span>#非常有幫助</span> */}
                    </div>
                    <div className="r_list_tag_content r_list_tag_content_color">
                        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
                        gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.
                        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam
                        fermentum, nulla luctus pharetra vulputate. */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingV2;
