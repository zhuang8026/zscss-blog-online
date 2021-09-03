import React from 'react';
import ReactDOM from 'react-dom';

// HashRouter: 頁面路徑最前面會有個「#」，換url時不會發送request。
// BrowserRouter: 頁面路徑不會有井字，但換url時會發送request。
import { BrowserRouter as Router } from 'react-router-dom';
import './scss/_window.scss';
import './scss/_reset.scss';
import ProviderApp from './ProviderApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ProviderApp />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
