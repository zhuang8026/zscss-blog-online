import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

const Comments = () => {
    return (
        <div className="rating_card Comments">
            <div className="card_title">Comments Rating</div>
            <div className="card_tag_list">
                <ul>
                    <li className="card_tag">
                        <span>#太棒了</span>
                        <span>X 99</span>
                    </li>
                    <li className="card_tag">
                        <span>#非常有幫助</span>
                        <span>X 99</span>
                    </li>
                    <li className="card_tag">
                        <span>#寫得不錯</span>
                        <span>X 99</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Comments;
