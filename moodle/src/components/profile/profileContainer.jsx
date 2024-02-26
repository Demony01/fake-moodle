import React from "react";
import { connect } from "react-redux";
import Profile from "./profile";
import Loader from "../loader/loader";

const ProfileContainer = (props) => {
  if (!props.auth.data.university || !props.auth.data.university) {
    return <Loader />;
  }

   return <Profile props={props.auth} />;
};

let mapStateToProps = (state) => ({
  auth: state.auth,
});

export const ProfileConnected = connect(mapStateToProps, {})(ProfileContainer);
