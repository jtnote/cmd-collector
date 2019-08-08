import { connect } from 'react-redux'

import ListPagingBar from '../../components/list/ListPagingBar'
import { loadPage } from '../../actions/Index'
import Constants from '../../Constants'

const mapStateToProps = (state) => ({
    // notes: state.notes,
    token: state.token,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    pagingAffix: state.pagingAffix
    // active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    // loginSuccess: (token) => dispatch(loginSuccess(token)),
    // changeView: (view) => dispatch(changeView(view)),
    loadPage: (notes, currentPage, totalPages) => dispatch(loadPage(notes, currentPage, totalPages))
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(ListPagingBar);