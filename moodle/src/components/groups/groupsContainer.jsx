import { connect } from "react-redux";
import { useEffect } from "react";
import { getCourseBy123IdTC } from "../../store/reducers/taskReducers";
import Groups from "./groups";
import { getTeacherGroupTC } from "../../store/reducers/authReducers";

const GroupsContainer = (props) => {
    useEffect(() => {
        props.getTeacherGroupTC(props.auth.data.id)
    }, []);

    props.getCourseBy123IdTC(props.auth.data.id)

    return <Groups groupData={props.auth.groupData} auth={props.auth}/>;
};

let mapStateToProps = (state) => ({
    auth: state.auth,
});

export const GroupConnected = connect(mapStateToProps, { getTeacherGroupTC,getCourseBy123IdTC })(GroupsContainer);
