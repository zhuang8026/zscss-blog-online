import { createStore } from 'redux';

const initialState = {
    user: 'ASUS William',
    count: 1
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user };
        case 'SET_ADD_COUNT':
            console.log('count:', action.count);
            return { ...state, count: action.count };
        case 'SET_DELETE_COUNT':
            console.log('count:', action.count);
            return { ...state, count: action.count };
        default:
            return state;
    }
}

const store = createStore(userReducer);

export default store;
