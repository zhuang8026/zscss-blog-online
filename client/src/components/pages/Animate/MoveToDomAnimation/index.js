import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import './style_module.scss';
let options = [
    { key: 'RD', value: 'william' },
    { key: 'SA', value: 'Ryan' },
    { key: 'PM', value: 'Alex' },
    { key: 'QA', value: 'Rita' },
    { key: 'BE', value: 'Bosh' }
];
const MoveToDomAnimation = () => {
    const [isData, setIsData] = useState();

    const addToIcon = e => {
        let top = e.target.parentNode.offsetTop - e.target.parentNode.scrollLeft + e.target.parentNode.clientTop;
        let right = window.innerWidth - e.target.parentNode.getBoundingClientRect().right;

        if (document.body != null) {
            let dom = document.createElement('div'); // is a node
            dom.setAttribute('class', 'floating-cart');
            dom.innerHTML = '12';
            document.body.appendChild(dom);

            let cart = document.getElementsByClassName('floating-cart')[0];
            // productCard.clone().appendTo(cart);
            cart.style.cssText = `top:${top}px;right:${right}px;`;
            // cart.classList.add('moveToCart');
            fadeIn(cart);
            setTimeout(() => {
                cart.classList.add('moveToCart');
            }, 300);
            setTimeout(() => {
                document.body.setAttribute('class', 'MakeFloatingCart');
            }, 700);
            setTimeout(() => {
                // cart.remove();
                let tags = document.getElementsByClassName('floating-cart');
                let arrLenght = tags.length;
                for (var i = 0; i < arrLenght; i++) {
                    if (tags[i]) {
                        tags[i].remove();
                    }
                }
                document.body.classList.remove('MakeFloatingCart');
            }, 900);
        }
    };

    const fadeIn = (el, display) => {
        el.style.opacity = 0;
        el.style.display = display || 'block';

        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += 0.1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    };

    return (
        <>
            <div className="MoveToDomAnimation">
                {options.map((data, index) => {
                    return (
                        <div
                            className="box"
                            key={index}
                            onMouseEnter={e => {
                                // HoverCreateElemFun(e);
                            }}
                            onClick={e => {
                                addToIcon(e);
                            }}
                        >
                            <p className="key">職位: {data.key}</p>
                            <p className="value">名稱: {data.value}</p>
                            <div className="hoverBox">點擊添加 + </div>
                        </div>
                    );
                })}
            </div>
            <div className="icon" />
        </>
    );
};

export default MoveToDomAnimation;
