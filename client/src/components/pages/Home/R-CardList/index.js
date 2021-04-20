import React, { useState, useEffect, useRef } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import posed from 'react-pose';

// API
import axios from 'axios';
import { productsPagesAPI, postSearchCardListAPI } from 'api/products'; // product001 seacrh001

// DesignSystem
import Loading from 'components/DesignSystem/Loading';
import NoData from 'components/DesignSystem/NoData';

// antd
import { Rate } from 'antd';
import { Input } from 'antd';
import { Select } from 'antd';
import { Pagination } from 'antd';
import { CloudUploadOutlined, StarFilled, AudioOutlined } from '@ant-design/icons';

// outside framework
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const ItemAnimated = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
});

const CardList = ({ history }) => {
    const [contentLoad, setContentLoad] = useState(false); // 動畫控制
    const [isLoading, setIsLoading] = useState(true); // 載入
    const [isPage, setIsPage] = useState(1); // 頁碼
    const [isStar, setIsStar] = useState(0); // rating 數量
    const [isData, setIsData] = useState({}); // 此頁資料
    const [isArray, setIsArray] = useState([]); // 此頁資料
    const fetchListener = useRef(null); // fetch
    const btnElement = useRef(null);
    const { Option } = Select;
    const { Search } = Input;

    // console.log('isArray:', isArray);

    const handleChange = value => {
        // console.log(`selected: ${value}`);
        setIsStar(value);
        setIsPage(1);
    };

    // 拖拽settin
    const onDragEnd = result => {
        if (!result.destination) {
            return;
        }
        // console.log(result);
        const items = reorder(isArray, result.source.index, result.destination.index);
        // console.log('items:', items);
        setIsArray(items);
    };

    // 重新记录数组顺序
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        //删除并记录 删除元素
        const [removed] = result.splice(startIndex, 1);

        // console.log('removed:', removed);

        //将原来的元素添加进数组
        result.splice(endIndex, 0, removed);
        return result;
    };

    // API 獲取此頁資料
    const productsPagesAPICallBack = () => {
        const data = {
            isPage: isPage,
            isStar: isStar
        };
        setIsLoading(true);
        fetchListener.current = axios(productsPagesAPI('GET', data))
            .then(res => {
                if (res.status === 200) {
                    setIsLoading(false);
                    setIsData(res.data);
                    setIsArray(res.data.rows);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    // API 獲取此頁資料
    const postSearchCardListAPICallBack = selectData => {
        const data = {
            search: selectData
        };
        setIsLoading(true);
        fetchListener.current = axios(postSearchCardListAPI(data))
            .then(res => {
                // console.log(res);
                if (res.status === 200) {
                    setIsLoading(false);
                    setIsArray(res.data);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        setTimeout(() => {
            setContentLoad(true);
        }, 100);
    }, []);

    // 商品數量
    useEffect(() => {
        productsPagesAPICallBack();
    }, [isPage, isStar]);

    return (
        <div className="rating_r_list">
            {/* 評分 */}
            <div className="rating_r_select">
                <Select defaultValue="all rating" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="0">all rating</Option>
                    <Option value="1">
                        1 <StarFilled className="icon_star" />
                    </Option>
                    <Option value="2">
                        2 <StarFilled className="icon_star" />
                    </Option>
                    <Option value="3">
                        3 <StarFilled className="icon_star" />
                    </Option>
                    <Option value="4">
                        4 <StarFilled className="icon_star" />
                    </Option>
                    <Option value="5">
                        5 <StarFilled className="icon_star" />
                    </Option>
                </Select>
                <div className={classnames('rating_serach')}>
                    <Search
                        placeholder="search"
                        onSearch={value => {
                            postSearchCardListAPICallBack(value);
                        }}
                    />
                </div>
            </div>
            {/* 數量 */}
            <div className="rating_r_Showing">
                <p>
                    Showing {isData.rows ? 1 : 0}-{isData.rows ? isData.rows.length : 0} of{' '}
                    {isData.rows ? isData.totalRows : 0} items
                </p>
            </div>
            {/* 內容 */}
            <div className="rating_list_inner">
                {isLoading ? (
                    <>
                        <Loading />
                        <Loading />
                        <Loading />
                        <Loading />
                        <Loading />
                    </>
                ) : isData.totalRows > 0 ? (
                    <>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div
                                        // provided.droppableProps应用的相同元素.
                                        {...provided.droppableProps}
                                        // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                                        ref={provided.innerRef}
                                    >
                                        {isArray.map((data, index) => (
                                            <Draggable
                                                key={data.itemId}
                                                draggableId={data.itemId.toString()}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        // style={getItemStyle(
                                                        //     snapshot.isDragging,
                                                        //     provided.draggableProps.style
                                                        // )}
                                                    >
                                                        <ItemAnimated pose={contentLoad ? 'visible' : 'hidden'}>
                                                            <div
                                                                className="r_list"
                                                                key={data.itemId}
                                                                ref={btnElement}
                                                                index={index}
                                                            >
                                                                <div
                                                                    className="r_list_hover"
                                                                    id={data.itemId}
                                                                    onClick={e => {
                                                                        history.push(`/pen-detail/${data.penId}`);
                                                                    }}
                                                                />
                                                                <div className="r_list_card">
                                                                    <div className="r_list_title">
                                                                        <div className="r_list_title_left">
                                                                            <div className="r_list_head">
                                                                                <div className="figure_icon">
                                                                                    <img
                                                                                        src={require(`images/pen/${data.itemImg}`)}
                                                                                        alt="頭像"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="r_list_content">
                                                                                <h2 className="right_list_title">
                                                                                    {' '}
                                                                                    {data.itemName}{' '}
                                                                                </h2>
                                                                                <p>{data.updated_at}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="r_list_title_right">
                                                                            <CloudUploadOutlined className="icon-20" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="r_list_bottom">
                                                                        <div className="r_list_star">
                                                                            <Rate
                                                                                disabled
                                                                                allowHalf
                                                                                defaultValue={data.itemStar}
                                                                                value={data.itemStar}
                                                                            />
                                                                        </div>
                                                                        {/* 20201219 - 暫時隱藏 */}
                                                                        {/* <div className="r_list_tag">
                                                                        <span>#太棒了</span>
                                                                        <span>#非常有幫助</span>
                                                                    </div> */}
                                                                        <div className="r_list_tag_content">
                                                                            {data.itemsText}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </ItemAnimated>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {/* 占位符号 */}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

                        <Pagination
                            simple
                            current={isPage}
                            defaultCurrent={1}
                            total={parseInt(`${isData.totalPages}0`)}
                            onChange={event => {
                                setIsPage(event);
                            }}
                        />
                    </>
                ) : (
                    <NoData />
                )}
            </div>
        </div>
    );
};

export default withRouter(CardList);
