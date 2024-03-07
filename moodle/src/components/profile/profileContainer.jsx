import React from "react";
import { connect } from "react-redux";
import Profile from "./profile";
import Loader from "../loader/loader";
import { changeUserData, logoutUserTC } from "../../store/reducers/authReducers";
import { useNavigate } from "react-router-dom";

const ProfileContainer = (props) => {
  const navigate = useNavigate()
  const logout = ( )=> {
    props.logoutUserTC()
    navigate('/')
  }
  if (!props.auth.data.university || !props.auth.data.university) {
    return <Loader />;
  }
   return <Profile logout={logout} props={props.auth} change={props.changeUserData}/>;
};

let mapStateToProps = (state) => ({
  auth: state.auth,
});

export const ProfileConnected = connect(mapStateToProps, {changeUserData, logoutUserTC})(ProfileContainer);
