let nextTodoId = 0;
export const addTodo = text => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text: text
    };
};

export const setVisibilityFilter = filter => {
    console.log('filter:', filter);
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter: filter
    };
};

export const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        id: id
    };
};
