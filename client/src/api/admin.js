const DOMAIN = process.env.REACT_APP_API_DOMAIN || 'http://localhost:3009';

// admin sign-in s001 | admin登入 | signin 使用
export const postAdminSignIinAPI = data => {
    // console.log(data);
    return {
        method: 'POST',
        baseURL: DOMAIN,
        url: `/admin/signin`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        data: data
    };
};

// admin sign-out s002 | admin登出 | signout 使用
export const postAdminSignOutAPI = data => {
    return {
        method: 'POST',
        baseURL: DOMAIN,
        url: `/admin/signOut`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        data: data
    };
};

// ckeck in admin s003 | 確認是否有帳號 | signin 使用
export const postUserNameCheckInAPI = data => {
    // console.log(data);
    return {
        method: 'POST',
        baseURL: DOMAIN,
        url: `admin/checkinAccount`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        data: data
    };
};

// ckeck in admin s004 | 確認是否有帳號 | signin 使用
export const getAllAdminAPI = () => {
    // console.log(data);
    return {
        method: 'GET',
        baseURL: DOMAIN,
        url: `admin/allAdmin`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
};
