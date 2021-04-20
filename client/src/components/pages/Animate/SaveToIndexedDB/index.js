import React, { useState, useEffect, useRef } from 'react';

// css
import './style_module.scss';

const SaveToIndexedDB = () => {
    let indexedDB =
        window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
    let dbVersion = 1;

    // Create/open database
    // let request = indexedDB.open('elephantFiles', dbVersion);
    // let db;

    //初始化加载数据
    const DBFun = () => {
        let request = indexedDB.open('elephantFiles', dbVersion);
        let db;
        //第一次存入DB執行，其餘不會
        request.onupgradeneeded = event => {
            console.log('onupgradeneeded:', event);
            db = event.target.result;
            createObjectStore(db);
        };

        request.onsuccess = event => {
            console.log('DateBase open success');
            db = request.result;
            console.log(db);
            getImageFile(db);
            // if (db.version) {
            //     console.log('db.version:', db.version);
            //     // old version !== now version
            //     if (db.version != dbVersion) {
            //         console.log('DB version difference');
            //         let setVersion = db.setVersion(dbVersion);
            //         setVersion.onsuccess = () => {
            //             createObjectStore(db);
            //             getImageFile();
            //         };
            //     } else {
            //         getImageFile();
            //     }
            // } else {
            //     getImageFile();
            // }
        };

        request.onerror = e => {
            console.log('Error');
        };
    };

    const createObjectStore = dataBase => {
        // Create an objectStore
        console.log('Creating objectStore');
        dataBase.createObjectStore('elephants');
    };

    const getImageFile = db => {
        console.log('getImageFile');
        // Create XHR
        let xhr = new XMLHttpRequest(),
            blob;

        xhr.open('GET', require(`images/animate/getreward.png`), true);
        // Set the responseType to blob
        xhr.responseType = 'blob';

        xhr.addEventListener(
            'load',
            function () {
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
        let transaction = db.transaction(['elephants'], 'readwrite');

        // Put the blob into the dabase
        let put = transaction.objectStore('elephants').put(blob, 'image');
        console.log('put:', put);
        // Retrieve the file that was just stored
        transaction.objectStore('elephants').get('image').onsuccess = event => {
            let imgFile = event.target.result;
            console.log('Got elephant!' + imgFile);
            if (imgFile) {
                // Get window.URL object
                let URL = window.URL || window.webkitURL;

                // Create and revoke ObjectURL
                let imgURL = URL.createObjectURL(imgFile);

                // Set img src to ObjectURL
                let imgElement = document.getElementById('imgHolder');
                imgElement.setAttribute('src', imgURL);

                // Revoking ObjectURL
                // URL.revokeObjectURL(imgURL);
            }
        };
    };

    useEffect(() => {
        DBFun();
    }, []);

    return (
        <>
            <div className="SaveToIndexedDB">
                <img id="imgHolder" />
            </div>
        </>
    );
};

export default SaveToIndexedDB;
