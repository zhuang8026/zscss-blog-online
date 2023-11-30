import { combineReducers, createStore } from 'redux';

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

function visibilityFilter(state = 'SHOW_ALL', action) {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case 'COMPLETE_TODO':
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: true
                    });
                }
                return todo;
            });
        default:
            return state;
    }
}

let reducer = combineReducers({ userReducer, visibilityFilter, todos });

const store = createStore(reducer);

export default store;
