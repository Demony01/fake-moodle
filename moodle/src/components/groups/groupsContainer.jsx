import { connect } from "react-redux";
import { useEffect } from "react";
import { getCourseTC } from "../../store/reducers/taskReducers";
import Groups from "./groups";
import { getTeacherGroupTC } from "../../store/reducers/authReducers";

const GroupsContainer = (props) => {
    console.log(props.auth.data.id);
    useEffect(() => {
        props.getTeacherGroupTC(props.auth.data.id)
    }, []);


    return <Groups groupData={props.auth.groupData} auth={props.auth} />;
};

let mapStateToProps = (state) => ({
    auth: state.auth,
});

export const GroupConnected = connect(mapStateToProps, { getTeacherGroupTC })(GroupsContainer);
