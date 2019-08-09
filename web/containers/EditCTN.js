import { connect } from 'react-redux'

import Edit from '../components/Edit'
import { changeView, loadPage } from '../actions/Index'
import Constants from '../Constants'

const mapStateToProps = (state) => ({
    token: state.token,
    view: state.view,
    total: state.total,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    pageSize: state.pageSize,
    noteEdit: state.noteEdit
    // active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    // loginSuccess: (token) => dispatch(loginSuccess(token)),
    changeView: (view) => dispatch(changeView(view)),
    loadPage: (notes, total, currentPage, totalPages) => dispatch(loadPage(notes, total, currentPage, totalPages))
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(Edit);
// mapStateToProps,    mapDispatchToProps