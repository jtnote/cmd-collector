import { connect } from 'react-redux'

import List from '../components/List'
import { changeView, toEdit, selectNote, previewSelectedNote, loadPage } from '../actions/Index'
import Constants from '../Constants'

const mapStateToProps = (state) => ({
    token: state.token,
    notes: state.notes,
    idNoteSelected: state.idNoteSelected,
    noteSelected: state.noteSelected,
    currentPage: state.currentPage,
    totalPages: state.totalPages
    // active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    toEdit: (noteEdit) => dispatch(toEdit(noteEdit)),
    selectNote: (idNoteSelected) => dispatch(selectNote(idNoteSelected)),
    previewSelectedNote: (noteSelected) => dispatch(previewSelectedNote(noteSelected)),
    changeView: (view) => dispatch(changeView(view)),
    loadPage: (notes, total, currentPage, totalPages) => dispatch(loadPage(notes, total, currentPage, totalPages))
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(List);