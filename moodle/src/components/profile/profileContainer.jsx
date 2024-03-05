import React from "react";
import { connect } from "react-redux";
import Profile from "./profile";
import Loader from "../loader/loader";
import { changeUserData } from "../../store/reducers/authReducers";

const ProfileContainer = (props) => {
  if (!props.auth.data.university || !props.auth.data.university) {
    return <Loader />;
  }
   return <Profile props={props.auth} change={props.changeUserData}/>;
};

let mapStateToProps = (state) => ({
  auth: state.auth,
});

export const ProfileConnected = connect(mapStateToProps, {changeUserData})(ProfileContainer);
