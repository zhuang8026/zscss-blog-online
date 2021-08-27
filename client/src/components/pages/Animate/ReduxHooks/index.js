import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Main from './Main';
import reducer from './Reducer';

const store = createStore(reducer);

const ReduxHooks = () => {


    
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
};

export default ReduxHooks;
