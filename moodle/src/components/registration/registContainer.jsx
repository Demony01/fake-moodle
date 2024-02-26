import { connect } from "react-redux"
import Registration from "./regist"
import { getUniversityTC, registerUserTC } from "../../store/reducers/authReducers"

const RegistContainer = props => {
    return (
        <Registration props={props.auth} getUniversity={props.getUniversityTC} register={props.registerUserTC}/>
    )
}

let mapStateToProps = state => ({
    auth: state.auth
})

export const RegistConnected = connect(mapStateToProps, {registerUserTC, getUniversityTC})(RegistContainer)