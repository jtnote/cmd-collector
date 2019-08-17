import { connect } from 'react-redux'

import NavBar from '../components/NavBar'
import { changeView, logoutSuccess } from '../actions/Index'
import Constants from '../Constants'

const mapStateToProps = (state) => ({
    token: state.token
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeView: (view) => dispatch(changeView(view)),
    logoutSuccess: () => dispatch(logoutSuccess())
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(NavBar);