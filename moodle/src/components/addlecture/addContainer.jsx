import React from 'react';
import { connect } from 'react-redux';
import Add from './add';
import { AddLectureTC } from '../../store/reducers/gradeReducers';

const AddContainer = props => {
    console.log(props);
    return (
        <div>
            <Add course={props.course} AddLecture={props.AddLectureTC} />
        </div>
    );
}

let mapStateToProps = state => ({
    auth: state.auth,
    course: state.course
})

export const AddConnected = connect(mapStateToProps, {AddLectureTC})(AddContainer)
