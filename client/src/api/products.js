const DOMAIN = process.env.REACT_APP_API_DOMAIN || 'http://localhost:3009';

// product001 獲取分頁資料
export const productsPagesAPI = (method, data) => {
    return {
        method: method,
        baseURL: DOMAIN, // window.location.origin
        url: `products/pages/${data.isPage}/${data.isStar}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
};

// taring001 星星評分
export const ratingAllAPI = method => {
    return {
        method: method,
        baseURL: DOMAIN,
        url: `products/all`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
};

// detail001 細節頁面
export const detailPenAPI = (method, data) => {
    return {
        method: method,
        baseURL: DOMAIN,
        url: `products_detail/detail/${data.id}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
};

// seacrh001 模糊搜尋
export const postSearchCardListAPI = data => {
    return {
        method: 'POST',
        baseURL: DOMAIN,
        url: `products/search`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        data: data
    };
};
