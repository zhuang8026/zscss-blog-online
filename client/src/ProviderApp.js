import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

// contexts
import AdminContainer from 'contexts/admin';

/**
 * desc:
 * 這裏將是 context 的存放區域
 *
 */
function ProviderApp() {
    return (
        <Provider store={store}>
            <AdminContainer>
                <App />
            </AdminContainer>
        </Provider>
    );
}

export default ProviderApp;
