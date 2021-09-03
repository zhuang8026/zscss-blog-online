import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

// combineReducers 組合減速帶
const todoApp = combineReducers({
    todos,
    visibilityFilter
});

export default todoApp;

// combineReducers 等同與一下內容
// desc: combineReducers(state, action)
// export default function todoApp(state = {}, action) {
//     return {
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//         todos: todos(state.todos, action)
//     }
// }
