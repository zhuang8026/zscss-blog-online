const ADD_TODOLIST = 'ADD_TODOLIST';

const initState = {
    todoList: ['first'],
    william: ['number one']
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TODOLIST: {
            const tempTodo = state.todoList.map(list => list);
            tempTodo.push(action.payload.listName);
            return {
                todoList: tempTodo
            };
        }
        default:
            return state;
    }
};
export default reducer;
