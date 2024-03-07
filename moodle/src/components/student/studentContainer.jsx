import React, { useEffect } from "react";
import { connect } from "react-redux";
import Profile from "./student";
import Loader from "../loader/loader";
import { useLocation } from 'react-router-dom';
import { getStudentDataTC } from "../../store/reducers/authReducers";

const StudentContainer = (props) => {
  const location = useLocation();
  let groupId = location.pathname.split('/')[2];
  useEffect(() => {
    props.getStudentDataTC(groupId)
  }, []);
  console.log(props.auth);
  if (!props.auth.uniqueStudentData.university || !props.auth.uniqueStudentData.university) {
    return <Loader />;
  }
   return <Profile props={props.auth}/>;
};

let mapStateToProps = (state) => ({
  auth: state.auth,
});

export const StudentConnected = connect(mapStateToProps, { getStudentDataTC })(StudentContainer);
