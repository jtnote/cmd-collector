import Constants from '../Constants'

const initialState = {
    token: '',
    notes: [],
    view: Constants.DEFAULT_VIEW
}

function rootReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case 'CHANGE_VIEW':
            return Object.assign({}, state, {
                view: action.view
            });
        case 'LOAD_PAGE':
            return Object.assign({}, state, {
                notes: action.notes,
                currentPage: action.currentPage,
                totalPages: action.totalPages
            });
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, {
                token: action.token
            });
        default:
            return state;
    }
    return state;
}

export default rootReducer;