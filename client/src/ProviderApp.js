import React from 'react';

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
        <AdminContainer>
            <App />
        </AdminContainer>
    );
}

export default ProviderApp;
