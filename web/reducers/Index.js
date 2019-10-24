import Constants from '../Constants';

const initialState = {
    token: null,

    //for preview
    noteSelected: null,
    idNoteSelected: -1,

    //for detail edit
    noteEdit: null,

    //for list
    notes: [],
    total: 0,
    currentPage: 1,
    totalPages: 1,

    //global
    pageSize: Constants.PAGE_SIZE, //TODO: immutable?
    pagingAffix: Constants.PAGING_AFFIX, // first/last several N buttons as group, used in pagingbar 

    // editAction: Constants.EDIT_ACTION_ADD,

    //TODO: if total<3?
    view: Constants.DEFAULT_VIEW
}

function rootReducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case 'CHANGE_VIEW':
            if (action.view == Constants.VIEW_EDIT) {
                return Object.assign({}, state, {
                    view: action.view,
                    noteEdit: action.noteEdit
                });
            }
            else {
                return Object.assign({}, state, {
                    view: action.view
                });
            }
            break;
        case 'SELECT_NOTE':
            return Object.assign({}, state, {
                idNoteSelected: action.idNoteSelected
            });
            break;
        case 'PREVIEW_SELECTED_NOTE':
            return Object.assign({}, state, {
                noteSelected: action.noteSelected
            });
            break;
        case 'LOAD_PAGE':
            localStorage.setItem('currentPage', action.currentPage);
            return Object.assign({}, state, {
                notes: action.notes,
                total: action.total,
                currentPage: action.currentPage,
                totalPages: action.totalPages
            });
            break;
        case 'LOGIN_SUCCESS':
            //also save token in local storage
            localStorage.setItem('token', action.token);
            localStorage.setItem('page', 1);
            return Object.assign({}, state, {
                token: action.token
            });
            break;
        case 'LOGOUT_SUCCESS':
            //also save token in local storage
            localStorage.removeItem('token');
            return Object.assign({}, state, {
                token: null
            });
            break;
        case 'REFRESH_TOKEN':
            return Object.assign({}, state, {
                token: action.token
            });
            break;
        default:
            return state;
            break;
    }
    return state;
}

export default rootReducer;