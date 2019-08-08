import { connect } from 'react-redux'

import Edit from '../components/Edit'
import { loginSuccess, changeView, loadPage } from '../actions/Index'
import Constants from '../Constants'

const mapStateToProps = (state) => ({
    token: state.token,
    editAction: state.editAction
    // active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    // loginSuccess: (token) => dispatch(loginSuccess(token)),
    // changeView: (view) => dispatch(changeView(view)),
    // loadPage: (notes, currentPage, totalPages) => dispatch(loadPage(notes, currentPage, totalPages))
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(Edit);
// mapStateToProps,    mapDispatchToProps