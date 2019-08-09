import Constants from '../Constants';

const initialState = {
    token: '',

    //for edit
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
        // case 'CHANGE_EDIT_ACTION':
        //     return Object.assign({}, state, { editAction: action.editAction });
        case 'LOAD_PAGE':
            return Object.assign({}, state, {
                notes: action.notes,
                total: action.total,
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