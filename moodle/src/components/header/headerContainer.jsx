import { connect } from "react-redux"
import Header from "./header"

const HeaderContainer = props => {
    return (
        <Header auth={props.auth}/>
    )
}

let mapStateToProps = state => ({
    auth: state.auth
})

export const HeaderConnected = connect(mapStateToProps, {})(HeaderContainer)