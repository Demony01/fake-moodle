import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useLocation } from 'react-router-dom';
import { GetCourseByIdTC, SendAnswerTC } from '../../store/reducers/taskReducers';
import Taskk from './taskk';
import Loader from '../loader/loader';

const TaskContainer = (props) => {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const taskId = parseInt(pathArray[pathArray.length - 1], 10);

    const [loading, setLoading] = useState(true);

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
                <Taskk userId={props.auth.data.id} course={props.course} sendAnswer={props.SendAnswerTC} />
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    course: state.course,
});

export const TaskConnected = connect(mapStateToProps, { GetCourseByIdTC, SendAnswerTC })(TaskContainer);
