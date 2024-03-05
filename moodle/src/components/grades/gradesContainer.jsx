import React from 'react';
import Grades from './grades';
import { useEffect } from 'react';
import { connect } from "react-redux"
import { getGradeByIdTC123, getGradeTC } from '../../store/reducers/gradeReducers';
import { useLocation } from 'react-router-dom';

const GradesContainer = props => {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const taskId = parseInt(pathArray[pathArray.length - 1], 10);


    useEffect(() => {
        if (props.auth.data.id) {
          props.getGradeTC(props.auth.data.id);
        } else {}
      }, [props.auth.data.id]);

    useEffect(() => {
    if (taskId) {            
        props.getGradeByIdTC123(taskId, props.auth.data.id)
    }
    }, [])

    return (
        <div>
            <Grades grades={props.grades} />
        </div>
    );
}

let mapStateToProps = state => ({
    auth: state.auth,
    grades: state.grades
})

export const GradesConnected = connect(mapStateToProps, {getGradeTC, getGradeByIdTC123})(GradesContainer)
