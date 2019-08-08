export const changeView = (view) => ({
    type: 'CHANGE_VIEW',
    view: view
});

export const loadPage = (notes, currentPage, totalPages) => ({
    type: 'LOAD_PAGE',
    notes,
    currentPage,
    totalPages
});

export const loginSuccess = (token) => ({
    type: 'LOGIN_SUCCESS',
    token: token
});

// export const addTodo = text => ({
//     type: 'ADD_TODO',
//     id: nextTodoId++,
//     text
//   })