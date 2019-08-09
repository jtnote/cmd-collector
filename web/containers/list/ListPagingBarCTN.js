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
    loadPage: (notes, total, currentPage, totalPages) => dispatch(loadPage(notes, total, currentPage, totalPages))
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(ListPagingBar);