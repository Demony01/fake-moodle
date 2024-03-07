import React from 'react';
import RatingTeacher from './rating';
import { getTeacherRatingTC } from '../../store/reducers/gradeReducers';

const RatingContainer = () => {
    return (
        <div>
            <RatingTeacher />
        </div>
    );
}

let mapStateToProps = {
    auth: state.auth
}

export default RatingConnected = connect(mapStateToProps, {getTeacherRatingTC})(RatingContainer);
