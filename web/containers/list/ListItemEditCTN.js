import { connect } from 'react-redux'

import ListItemEdit from '../components/list/ListItemEdit'
import { loginSuccess, changeView } from '../actions/Index'
import Constants from '../Constants'

const mapStateToProps = (state) => ({
    token: state.token,
    editAction: state.editAction
    // active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    // loginSuccess: (token) => dispatch(loginSuccess(token)),
    changeView: (view) => dispatch(changeView(view))
    // loadPage: (notes, currentPage, totalPages) => dispatch(loadPage(notes, currentPage, totalPages))
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(ListItemEdit);
// mapStateToProps,    mapDispatchToProps