const DOMAIN = process.env.REACT_APP_API_DOMAIN_LOCAL;
// const DOMAIN = 'http://localhost:3009';

// message001 發送留言
export const getMessagesAPI = (sid) => {
    return {
        method: 'GET',
        baseURL: DOMAIN, // window.location.origin
        url: `chat/chatroom/${sid}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
};

// message002 發送留言
export const postMessagesAPI = (data) => {
    return {
        method: 'POST',
        baseURL: DOMAIN, // window.location.origin
        url: `chat/createmsg`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        data: data
    };
};
