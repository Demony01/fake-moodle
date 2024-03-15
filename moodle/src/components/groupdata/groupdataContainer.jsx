import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getGroupDataTC, pushGroupDataTC } from '../../store/reducers/authReducers';
import Groupdata from './groupdata';
import { AddLectureTC } from '../../store/reducers/gradeReducers';

const GroupdataContainer = props => {
    useEffect(() => {
        props.getGroupDataTC(props.auth.groupData[0].id)
    }, []);
    return (
        <div>
            <Groupdata course={props.course}  auth={props.auth} addNewLecture={props.pushGroupDataTC} addLecture={props.AddLectureTC} />
        </div>
    );
}

let mapStateToProps = (state) => ({
    auth: state.auth,
    course: state.course
});

export const TeacherGroupConnected = connect(mapStateToProps, { getGroupDataTC, pushGroupDataTC, AddLectureTC })(GroupdataContainer);
