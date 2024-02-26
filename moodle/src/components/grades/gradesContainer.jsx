import React from 'react';
import Grades from './grades';
import { useEffect } from 'react';
import { connect } from "react-redux"
import { getGradeTC } from '../../store/reducers/gradeReducers';

const GradesContainer = props => {
    useEffect(() => {
        if (props.auth.data.id) {
          props.getGradeTC(props.auth.data.id);
        } else {}
      }, [props.auth.data.id]); 
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

export const GradesConnected = connect(mapStateToProps, {getGradeTC})(GradesContainer)
