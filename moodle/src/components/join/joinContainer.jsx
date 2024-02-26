import React from 'react';
import Join from './join';
import { useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { joinClubTC } from '../../store/reducers/authReducers';

const JoinContainer = (props) => {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const taskId = parseInt(pathArray[pathArray.length - 1], 10);


    const matchingClub = props.club.data[0].find((club) => club.id === taskId);

    return (
        <div>
            <Join auth={props.auth} club={matchingClub} joinClub={props.joinClubTC} />
        </div>
    );
}


let mapStateToProps = state => ({
    auth: state.auth,
    club: state.club
})

export const JoinConnected = connect(mapStateToProps, {joinClubTC})(JoinContainer)
