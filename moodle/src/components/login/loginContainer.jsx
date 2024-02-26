import { connect } from "react-redux"
import Login from "./login"
import { loginStudentTC, loginTeacherTC } from "../../store/reducers/authReducers"

const LoginContainer = props => {
    return (
        <Login login={props.loginStudentTC} loginTeacher={props.loginTeacherTC}/>
    )
}

let mapStateToProps = state => ({
    auth: state.auth
})

export const LoginConnected = connect(mapStateToProps, {loginStudentTC, loginTeacherTC})(LoginContainer)