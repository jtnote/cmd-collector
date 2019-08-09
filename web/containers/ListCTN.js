import { connect } from 'react-redux'

import List from '../components/List'
import { toEdit, changeView, loadPage } from '../actions/index'
import Constants from '../Constants'

const mapStateToProps = (state) => ({
    token: state.token,
    notes: state.notes,
    currentPage: state.currentPage,
    totalPages: state.totalPages
    // active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    toEdit: (noteEdit) => dispatch(toEdit(noteEdit)),
    changeView: (view) => dispatch(changeView(view)),
    loadPage: (notes, total, currentPage, totalPages) => dispatch(loadPage(notes, total, currentPage, totalPages))
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(List);