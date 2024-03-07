import { connect } from "react-redux";
import Header from "./header";
import { fetchUserData } from "../../store/reducers/authReducers";
import { useEffect } from "react";

const HeaderContainer = props => {
    return (
        <Header auth={props.auth} />
    );
}

let mapStateToProps = state => ({
    auth: state.auth
});

// Correct usage of connect, passing fetchUserData as part of the mapDispatchToProps object
export const HeaderConnected = connect(mapStateToProps, {  })(HeaderContainer);
