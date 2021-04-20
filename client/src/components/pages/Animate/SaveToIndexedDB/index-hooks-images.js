import React, { useState, useEffect, useRef } from 'react';

// css
import './style_module.scss';

const SaveToIndexedDB = () => {
    const [db, setDB] = useState(null);
    let dbVersion = 1;
    // let request = window.indexedDB.open('test', dbVersion);

    //初始化加载数据
    const DBFun = () => {
        let db;
        let request = window.indexedDB.open('test', dbVersion);
        //这个方法就第一次会执行
        request.onupgradeneeded = function (event) {
            console.log(event);
            /**
             * 数据库新建成功以后，新增一张叫做data的表格，主键是id。更好的写法是先判断一下，这张表是否存在，如果不存在再新建。
             * data其实就是键值对
             * ex：data：{id：1，name："1"}
             */
            db = event.target.result;
            if (!db.objectStoreNames.contains('data')) {
                console.log('第一次创建一个字段，即表');
                db.createObjectStore('data', { keyPath: 'id' });
            } else {
                console.log(db);
            }
        };

        request.onsuccess = function (e) {
            console.log('数据库打开成功');

            readData(request.result);
        };

        request.onerror = function (e) {
            console.log('Error');
            console.log(e);
        };
    };

    //删除缓存
    const handleClickDelete = () => {
        // 删除表库的
        // let DBDeleteRequest = window.indexedDB.deleteDatabase("test");
        //删除字段的
        let DBDeleteRequest = window.indexedDB.open('test', 1);
        DBDeleteRequest.onsuccess = function (event) {
            let transaction = DBDeleteRequest.result.transaction(['data'], 'readwrite');
            let objectStore = transaction.objectStore('data');
            let request = objectStore.delete(1);
            request.onsuccess = function (event) {
                console.log('数据删除成功');
            };
        };
    };

    //新增数据
    const addData = () => {
        /*
            transaction()方法接受两个参数：第一个参数是一个数组，里面是所涉及的对象仓库，通常是只有一个；第二个参数是一个表示操作类型的字符串。
            目前，操作类型只有两种：readonly（只读）和readwrite（读写）。添加数据使用readwrite，读取数据使用readonly。第二个参数是可选的，省略时默认为readonly模式。
            objectStore():包含了当前对象仓库的所有索引,也就是哪张表存入了什么数据
        */
        let DBAddRequest = window.indexedDB.open('test');
        DBAddRequest.onsuccess = function (event) {
            let transaction = DBAddRequest.result.transaction(['data'], 'readwrite');
            let objectStore = transaction.objectStore('data');
            let request = objectStore.get(1);
            request.onsuccess = function (event) {
                //离开页面时看当前有误数据，有的话就说明上一次存过，只需要更新最新的，没有的话就插入
                if (request.result) {
                    console.log('更新最新的值');
                    let objectStoreRequest = objectStore.put({
                        id: 1,
                        name: 'william-1',
                        age: 30,
                        email: 'william-1@gmail.com'
                    });
                    objectStoreRequest.onsuccess = function (event) {
                        console.log('数据更新写入成功');
                    };
                    objectStoreRequest.onerror = function (event) {
                        console.log('数据更新写入失败');
                    };
                } else {
                    //这里可以对这个对象进行判断，看有无数据，如果有的话插入，没有就不插入
                    let objectStoreRequest = objectStore.add({
                        id: 1,
                        name: 'Alex-1',
                        age: 24,
                        email: 'Alex-1@gmail.com'
                    });
                    objectStoreRequest.onsuccess = function (event) {
                        console.log('数据写入成功');
                    };
                    objectStoreRequest.onerror = function (event) {
                        console.log('数据写入失败');
                    };
                }
            };
        };
    };

    //新增数据
    const addImage = () => {
        /**
            transaction()方法接受两个参数：第一个参数是一个数组，里面是所涉及的对象仓库，通常是只有一个；第二个参数是一个表示操作类型的字符串。
                -> 目前，第二个参数是可选的，省略时默认为readonly模式。
                    -> readonly（只读） 读取数据使用readonly
                    -> readwrite（读写）添加数据使用readwrite
            objectStore():包含了当前对象仓库的所有索引,也就是哪张表存入了什么数据
        */
        let DBAddRequest = window.indexedDB.open('test', dbVersion);

        DBAddRequest.onsuccess = function (event) {
            let transaction = DBAddRequest.result.transaction(['data'], 'readwrite');
            let objectStore = transaction.objectStore('data');
            let request = objectStore.get(1);
            let db = event.target.result;
            request.onsuccess = function (event) {
                //离开页面时看当前有误数据，有的话就说明上一次存过，只需要更新最新的，没有的话就插入
                if (request.result) {
                    console.log('更新最新的值');
                    getImageFile(db);
                    // let objectStoreRequest = objectStore.put({
                    //     id: 1,
                    //     name: 'william-2',
                    //     age: 30,
                    //     email: 'william-2@gmail.com'
                    // });
                    // objectStoreRequest.onsuccess = function (event) {
                    //     console.log('数据更新写入成功');
                    // };
                    // objectStoreRequest.onerror = function (event) {
                    //     console.log('数据更新写入失败');
                    // };
                } else {
                    //这里可以对这个对象进行判断，看有无数据，如果有的话插入，没有就不插入
                    let objectStoreRequest = objectStore.add({
                        id: 1,
                        name: 'Alex-2',
                        age: 24,
                        email: 'Alex-2@gmail.com'
                    });
                    objectStoreRequest.onsuccess = function (event) {
                        console.log('数据写入成功');
                    };
                    objectStoreRequest.onerror = function (event) {
                        console.log('数据写入失败');
                    };
                }
            };
        };
    };

    const getImageFile = db => {
        // Create XHR
        let xhr = new XMLHttpRequest(),
            blob;

        xhr.open('GET', require(`images/animate/getReward.png`), true);

        // Set the responseType to blob
        xhr.responseType = 'blob';

        xhr.addEventListener(
            'load',
            function (e) {
                console.log(xhr);
                if (xhr.status === 200) {
                    console.log('Image retrieved');

                    // Blob as response
                    blob = xhr.response;
                    console.log('Blob:' + blob);

                    // Put the received blob into IndexedDB
                    putElephantInDb(blob, db);
                }
            },
            false
        );
        // Send XHR
        xhr.send();
    };

    const putElephantInDb = (blob, db) => {
        console.log('Putting elephants in IndexedDB');

        // Open a transaction to the database
        let transaction = db.transaction(['data'], 'readwrite');
        let objectStore = transaction.objectStore('data');
        // Put the blob into the dabase
        objectStore.put({
            id: 1,
            image: blob
        });

        // Retrieve the file that was just stored
        objectStore.get(1).onsuccess = function (event) {
            let imgFile = event.target.result;
            console.log('Got elephant!' + imgFile['image']);
            console.log('Got event!' + event.target);
            // Get window.URL object
            let URL = window.URL || window.webkitURL;
            // console.log(URL);
            // Create and revoke ObjectURL
            let imgURL = URL.createObjectURL(imgFile['image']);
            // // // Set img src to ObjectURL
            let imgElephant = document.getElementById('imgHolder');
            imgElephant.setAttribute('src', imgURL);
            // Revoking ObjectURL
            URL.revokeObjectURL(imgURL);
        };
    };

    //读取数据
    const readData = result => {
        let transaction = result.transaction(['data']);
        let objectStore = transaction.objectStore('data');
        let request = objectStore.get(1);
        request.onsuccess = function (event) {
            if (request.result) {
                console.log(request.result);
            } else {
                console.log('未获得数据记录');
            }
        };
    };

    useEffect(() => {
        DBFun();
    }, []);

    return (
        <>
            <div className="SaveToIndexedDB">
                <img src={require(`images/animate/getReward.png`)} id="imgHolder2" />
                <img id="imgHolder" />

                <button onClick={() => addData()}>add normal data</button>
                <button onClick={() => addImage()}>add image files</button>

                <button onClick={() => handleClickDelete()}>delete first one data</button>
            </div>
        </>
    );
};

export default SaveToIndexedDB;
