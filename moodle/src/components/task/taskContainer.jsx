import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useLocation } from 'react-router-dom';
import { GetCourseByIdTC, SendAnswerTC } from '../../store/reducers/taskReducers';
import Taskk from './taskk';
import Loader from '../loader/loader';
import { getTaskDataTC } from '../../store/reducers/gradeReducers';

const TaskContainer = (props) => {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const taskId = pathArray[2].split('&')[0];
    const lectureId = pathArray[2].split('&')[1]

    const [loading, setLoading] = useState(true);
    console.log(props);
    useEffect(() => {
        props.GetCourseByIdTC(taskId)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [taskId]);
    

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <Taskk taskId={taskId} lectureId={lectureId} grade={props.grade} userId={props.auth.data.id} course={props.course} getTaskData={props.getTaskDataTC} sendAnswer={props.SendAnswerTC} />
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    course: state.course,
    grade: state.grades.taskData
});

export const TaskConnected = connect(mapStateToProps, { GetCourseByIdTC, SendAnswerTC, getTaskDataTC })(TaskContainer);
