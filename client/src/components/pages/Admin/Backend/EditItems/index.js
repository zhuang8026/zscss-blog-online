import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

import { from } from 'rxjs';
import Cookies from 'js-cookie';

// DesignSystem
import { FullWindowAnimateStorage } from 'components/DesignSystem/FullWindow';

// antd
import { Switch } from 'antd';
import { SaveOutlined, EnterOutlined } from '@ant-design/icons';

// Context
import { popWindowStorage } from 'components/DesignSystem/PopWindow';

// API
import axios from 'axios';
import { detailPenAPI } from 'api/products';
import { postBackendEditAPI } from 'api/admin';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const EditItems = ({ penId, reset }) => {
    const { openOrompt } = useContext(popWindowStorage);
    const { closeAnimate } = useContext(FullWindowAnimateStorage);

    const [basic, setBasic] = useState({});
    const [note, setNote] = useState([]);
    const fetchListener = useRef();
    const detailListener = useRef();

    const addCard = () => {
        setNote(prevState => {
            const arr = [...prevState, { pen_code: false }];
            return arr;
        });
    };

    const deleteCard = index => {
        setNote(prevState => {
            const front = prevState.slice(0, index);
            const end = prevState.slice(index + 1);

            return [...front, ...end];
        });
    };

    // normal data
    const basicAction = (type, val) => {
        switch (type) {
            case 'penTitle':
                setBasic(pre => {
                    return { ...pre, penTitle: val };
                });
                break;
            case 'penStar':
                setBasic(pre => {
                    return { ...pre, penStar: val };
                });
                break;
            case 'penStyle':
                setBasic(pre => {
                    return { ...pre, penStyle: val };
                });
                break;
            default:
                break;
        }
    };

    // array data
    const noteAction = (index, type, val) => {
        setNote(pre => {
            pre[index][type] = val;
            return [...pre];
        });
    };

    // api
    const save = () => {
        if (
            !basic.hasOwnProperty('penTitle') ||
            !basic.hasOwnProperty('penStyle') ||
            !basic.hasOwnProperty('penStar')
        ) {
            openOrompt({
                state: 'info',
                title: 'Sorry...',
                desc: 'Please write Basic Information. Thx.',
                button: [
                    {
                        name: 'Close',
                        callback: null
                    }
                ]
            });
            return;
        }

        if (note.length <= 0) {
            openOrompt({
                state: 'info',
                title: 'Sorry...',
                desc: 'Please write notebook detail. Thx.',
                button: [
                    {
                        name: 'Close',
                        callback: null
                    }
                ]
            });
            return;
        }
        postBackendEditAPICallBack();
    };

    // backend001 - save data
    const postBackendEditAPICallBack = () => {
        const payload = {
            penId,
            title: basic?.penTitle || '',
            img: basic?.penImg || 'js.jpg',
            style: basic?.penStyle || '',
            star: basic?.penStar || '',
            blockData: note // array
        };

        fetchListener.current = from(axios(postBackendEditAPI(payload))).subscribe(res => {
            console.log('backend001:', res);
            if (res.status === 200) {
                if (res.data.state === 200) {
                    openOrompt({
                        state: 'success',
                        title: 'Success',
                        desc: 'Add info success !',
                        button: [
                            {
                                name: 'Close',
                                callback: closeAnimate
                            }
                        ]
                    });
                    reset();
                } else {
                    openOrompt({
                        state: 'error',
                        title: 'Error',
                        desc: `Status ${res.data.state}`,
                        button: [
                            {
                                name: 'Close',
                                callback: null
                            }
                        ]
                    });
                }
            }
        });
    };

    // 細節頁面資料/detail001
    const detailPenAPIAction = () => {
        let payload = {
            id: penId
        };
        detailListener.current = axios(detailPenAPI('GET', payload))
            .then(res => {
                if (res.status === 200) {
                    let body = res.data.results;
                    console.log(body);
                    const { pId, penImg, penStar, penStyle, penTitle, penBlock } = body;

                    setNote(penBlock);
                    setBasic({
                        pId,
                        penImg,
                        penStar,
                        penStyle,
                        penTitle
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        detailPenAPIAction();
    }, []);

    return (
        <div className={cx('card')}>
            <div className={cx('gobackIcon')} onClick={() => closeAnimate()}>
                <EnterOutlined style={{ color: '#fff', fontSize: '30px' }} />
            </div>

            <div className={cx('add')}>
                <h3>Basic Information</h3>
                <div className={cx('basic')}>
                    <div className={cx('inner')}>
                        <label for="title">
                            title <span>(標題名稱)</span>
                        </label>
                        <input
                            id="title"
                            name="title"
                            placeholder="請輸入..." //
                            value={basic.penTitle}
                            onChange={event => {
                                let val = event.target.value;
                                basicAction('penTitle', val);
                            }}
                        />
                    </div>
                    <div className={cx('inner')}>
                        <label for="star">
                            star <span>(評分 "1-5")</span>
                        </label>
                        <input
                            id="star"
                            name="star"
                            placeholder="請輸入..."
                            type="number"
                            min="1"
                            max="5"
                            value={basic.penStar}
                            onChange={event => {
                                let val = Number(event.target.value);
                                basicAction('penStar', val);
                            }}
                        />
                    </div>
                    <div className={cx('inner')}>
                        <label for="type">
                            type <span>(內容類型)</span>
                        </label>
                        <input
                            id="type"
                            name="type"
                            placeholder="請輸入..." //
                            value={basic.penStyle}
                            onChange={event => {
                                let val = event.target.value;
                                basicAction('penStyle', val);
                            }}
                        />
                    </div>
                </div>

                <h3>Note</h3>
                <div className={cx('note')}>
                    <div className={cx('addBtn')}>
                        <button onClick={addCard}>+</button>
                    </div>

                    <div className={cx('addBtnForSave')}>
                        <button
                            className={cx(note.length > 0 ? 'enable' : 'disable')}
                            onClick={() => {
                                if (note.length > 0) save();
                            }}
                        >
                            <SaveOutlined />
                        </button>
                    </div>

                    <div className={cx('add')}>
                        {note.length > 0
                            ? note.map((data, index) => {
                                  return (
                                      <div className={cx('addCard', data['pen_code'] && 'colorChange')}>
                                          <div className={cx('icon')} onClick={() => deleteCard(index)}>
                                              -
                                          </div>
                                          <div className={cx('inner')}>
                                              <label for="addTitle">container title</label>
                                              <input
                                                  id="addTitle"
                                                  name="addTitle"
                                                  placeholder="請輸入..."
                                                  value={data.pen_title}
                                                  onChange={event => {
                                                      let val = event.target.value;
                                                      noteAction(index, 'pen_title', val);
                                                  }}
                                              />
                                          </div>
                                          {/* <div className={cx('inner')}>
                                                        <label for="addType">container type</label>
                                                        <input id="addType" name="addType" placeholder="請輸入..." />
                                                    </div> */}
                                          <div className={cx('inner')}>
                                              <div className={cx('switch')}>
                                                  <label for="addInner">container inner</label>
                                                  {/**
                                                                false === 0 / Text
                                                                true === 1 / Code
                                                            */}
                                                  <Switch
                                                      checkedChildren="Code"
                                                      unCheckedChildren="Text"
                                                      defaultChecked={data['pen_code'] ? true : false}
                                                      onChange={event => noteAction(index, 'pen_code', event)}
                                                  />
                                              </div>
                                              <textarea
                                                  id="addInner"
                                                  name="addInner"
                                                  aria-required="true"
                                                  placeholder="請輸入..."
                                                  value={data.is_text}
                                                  onChange={event => {
                                                      let val = event.target.value;
                                                      noteAction(index, 'is_text', val);
                                                  }}
                                              />
                                          </div>
                                      </div>
                                  );
                              })
                            : 'Please click left "+" button.'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(EditItems);
