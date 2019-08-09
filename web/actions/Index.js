import Constants from '../Constants';

export const changeView = (view) => ({
    type: 'CHANGE_VIEW',
    view
});

export const toEdit = (noteEdit) => ({
    type: 'CHANGE_VIEW',
    view: Constants.VIEW_EDIT,
    noteEdit
});

export const loadPage = (notes, total, currentPage, totalPages) => ({
    type: 'LOAD_PAGE',
    notes,
    total,
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