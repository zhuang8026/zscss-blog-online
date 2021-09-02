import React from 'react';

// DesignSystem
import PrismCode from 'components/DesignSystem/PrismCode';
import text01 from './text01.json';

import text02 from './text02.json';
import text03 from './text03.json';

import text04 from './text04.json';
import text05 from './text05.json';
import text05_5 from './text05_5.json';

import text06 from './text06.json';

// css
import classes from '../style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Note = () => {
    return (
        <>
            <div className={cx('note')}>
                <h2>第一步: React Redux 與 Hooks</h2>
                <PrismCode code={text01.pen_content.replace(/↵/g, '\n')} />
            </div>

            <div className={cx('note')}>
                <h2>第二步: useSelector, 這個方法允許我們直接從 Redux store 中的狀態提取數據到元件中</h2>
                <div className={cx('desc')}>
                    <p>1. useSelector 可以回傳任何值，並不一定是一個物件(mapStateToProps則是必定回傳一個物件)。</p>
                    <p>
                        2. useSelector
                        會將前一個結果與當前的結果進行比較，如果不同就會強制更新元件，不然就不會更新元件。
                    </p>
                    <p>3. useSelector 沒有自己的 props，但可以透過 JavaScript 的閉包觀念取得元件中的 props。</p>
                    <p>4. useSelector 預設是使用 === 嚴格等於的方式檢查(mapStateToProps 則是 ==)</p>
                </div>
                <PrismCode code={text02.pen_content.replace(/↵/g, '\n')} />
                <PrismCode code={text03.pen_content.replace(/↵/g, '\n')} />
            </div>

            <div className={cx('note')}>
                <h2>第三步: useDispatch: 用來取代掉 mapStateToDispatch</h2>
                <div className={cx('desc')}>
                    <p>1. useDispatch 取代 mapStateToDispatch。</p>
                    <p>2. 跟 connect 、 mapStateToProps 與 mapStateToDispatch 說再見，已經完全用不到了。</p>
                </div>
                <PrismCode code={text04.pen_content.replace(/↵/g, '\n')} />
                <PrismCode code={text05.pen_content.replace(/↵/g, '\n')} />
                <div className={cx('desc')}>
                    <p className={cx('impor')}>
                        ** 注意如果我們是透過 callback 的方式來發一個 action 時，需要透過 useCallback 的方式處理，避免掉多餘的重新渲染。**
                    </p>
                </div>
                <PrismCode code={text05_5.pen_content.replace(/↵/g, '\n')} />
            </div>

            <div className={cx('note')}>
                <h2>第四步: useStore: 取得我們透過 Provider 提供的 store 物件</h2>
                <PrismCode code={text06.pen_content.replace(/↵/g, '\n')} />
            </div>
        </>
    );
};

export default Note;
