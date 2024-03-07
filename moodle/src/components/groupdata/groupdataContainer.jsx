import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getGroupDataTC } from '../../store/reducers/authReducers';
import Groupdata from './groupdata';

const GroupdataContainer = props => {
    useEffect(() => {
        props.getGroupDataTC(props.auth.groupData[0].id)
    }, []);
    return (
        <div>
            <Groupdata auth={props.auth} />
        </div>
    );
}

let mapStateToProps = (state) => ({
    auth: state.auth,
});

export const TeacherGroupConnected = connect(mapStateToProps, { getGroupDataTC })(GroupdataContainer);
