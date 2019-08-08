import { connect } from 'react-redux'

import Login from '../components/Login'
import { loginSuccess, changeView, loadPage } from '../actions/Index'
import Constants from '../Constants'

const mapStateToProps = (state) => ({
    token: state.token
    // active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    loginSuccess: (token) => dispatch(loginSuccess(token)),
    changeView: (view) => dispatch(changeView(view)),
    loadPage: (notes, currentPage, totalPages) => dispatch(loadPage(notes, currentPage, totalPages))
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(Login);
// mapStateToProps,    mapDispatchToProps