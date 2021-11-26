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
import { postBackendCreateAPI } from 'api/admin';
import { productsAllpensAPI } from 'api/products';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const CreateItems = ({ history }) => {
    const { openOrompt } = useContext(popWindowStorage);
    const { closeAnimate } = useContext(FullWindowAnimateStorage);

    const [basic, setBasic] = useState();
    const [note, setNote] = useState([]);
    const [penId, setPenId] = useState('');
    const fetchListener = useRef();

    console.log('note:', note);

    const addCard = () => {
        setNote(prevState => {
            const arr = [...prevState, { pen_code: false }];
            return arr;
        });
    };

    const deleteCard = index => {
        console.log(index);
        setNote(prevState => {
            const front = prevState.slice(0, index);
            const end = prevState.slice(index + 1);

            return [...front, ...end];
        });
    };

    const switchAction = (event, index) => {
        setNote(pre => {
            pre[index]['codeBoolean'] = event;
            return [...pre];
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
        postBackendCreateAPICallBack();
    };

    // backend001
    const postBackendCreateAPICallBack = () => {
        let id = `${penId + 1}`.padStart(5, '0');
        const payload = {
            penId: `P${id}`,
            title: basic.penTitle,
            img: basic.penImg || 'js.jpg',
            style: basic.penStyle,
            star: basic.penStar,
            blockData: note
        };

        fetchListener.current = from(axios(postBackendCreateAPI(payload))).subscribe(res => {
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
                }
            }
        });
    };

    // allpens001
    const productsAllpensAPICallBack = () => {
        fetchListener.current = from(axios(productsAllpensAPI())).subscribe(res => {
            if (res.status === 200) {
                if (res.data.state === 200) {
                    let list = res.data.body.pop();
                    let num = list.penId.replace(/[^0-9]/gi, '');

                    setPenId(Number(num));
                }
            }
        });
    };

    useEffect(() => {
        productsAllpensAPICallBack();
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
                            onChange={event => {
                                let val = event.target.value;
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
                        <button onClick={() => save()}>
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
                                                      onChange={event => noteAction(index, 'pen_code', event)}
                                                  />
                                              </div>
                                              <textarea
                                                  id="addInner"
                                                  name="addInner"
                                                  aria-required="true"
                                                  placeholder="請輸入..."
                                                  onChange={event => {
                                                      let val = event.target.value;
                                                      noteAction(index, 'is_text', val);
                                                  }}
                                              />
                                          </div>
                                      </div>
                                  );
                              })
                            : '請點擊左側 "+" 按鈕'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(CreateItems);
