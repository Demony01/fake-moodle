import React, { useEffect, useState } from 'react';
import Course from './courses';
import { connect } from 'react-redux';
import { getCoursesTC } from '../../store/reducers/taskReducers';
import Loader from '../loader/loader';

const CoursesContainer = props => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('useEffect is running');

        setLoading(true);

        props.getCoursesTC(props.auth.data.id)
            .then(() => {
                // Set loading to false when the data is successfully fetched
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                // Set loading to false even in case of an error
                setLoading(false);
            });
    }, [props.auth.data.id]);

    return (
        <div>
            {loading ? (
                // Render a loader while data is being fetched
                <Loader />
            ) : (
                // Render the course component when data is available
                <Course course={props.course} />
            )}
        </div>
    );
};

let mapStateToProps = state => ({
    auth: state.auth,
    course: state.course,
});

export const CoursesConnected = connect(mapStateToProps, { getCoursesTC })(CoursesContainer);
