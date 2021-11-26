import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

// API
import axios from 'axios';
import { ratingAllAPI, productsPagesAPI, postSearchCardListAPI } from 'api/products'; // product001 seacrh001

// Context
import { AdminContext } from 'contexts/admin';

// antd
import { Table, Tag, Space } from 'antd';
import { Pagination } from 'antd';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const columns = [
    {
        title: 'ID',
        dataIndex: 'penId',
        key: 'penId'
    },
    {
        title: 'Star',
        dataIndex: 'star',
        key: 'star'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        )
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        )
    }
];

const TableItems = ({ history }) => {
    const [isLoading, setIsLoading] = useState(true); // 載入
    const [isPage, setIsPage] = useState(1); // 頁碼 pageNo, setPageNo
    const [pageState, setPageState] = useState(); // 頁面的數量
    const [items, setItems] = useState([]); // 此頁資料
    const fetchListener = useRef(null); // fetch

    const changePageNumber = num => {
        setIsPage(num);
    };

    // product001 API 獲取此頁資料
    const productsPagesAPICallBack = () => {
        const data = {
            isPage: isPage,
            isStar: 0
        };

        fetchListener.current = axios(productsPagesAPI('GET', data))
            .then(res => {
                // console.log('product001:', res);
                if (res.status === 200) {
                    setIsLoading(false);
                    let item = JSON.parse(JSON.stringify(res.data.rows));
                    let filterItems = item.map((data, index) => {
                        return {
                            key: data.pId,
                            penId: data.penId,
                            star: data.penStar,
                            name: data.penTitle,
                            tags: ['JavaScript']
                        };
                    });
                    setItems(filterItems);
                    setPageState(res.data);
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    // API product001
    useEffect(() => {
        setIsLoading(true);
        productsPagesAPICallBack();
    }, [isPage]);

    return (
        <div className={cx('tableItems')}>
            <div className={cx('page')}>
                <Pagination
                    showSizeChanger={false}
                    showQuickJumper={false}
                    defaultCurrent={isPage}
                    total={pageState?.totalRows} //
                    onChange={e => changePageNumber(e)}
                />
            </div>

            <div className={cx('table')}>
                <Table
                    columns={columns}
                    dataSource={items}
                    loading={isLoading} //
                    pagination={{ position: ['none', 'none'] }}
                />
            </div>
        </div>
    );
};

export default withRouter(TableItems);
