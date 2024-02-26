import { connect } from "react-redux"
import { useEffect } from "react";
import { getClubTC } from "../../store/reducers/clubReducers";
import Clubs from "./clubs";


const ClubsContainer = props => {
    console.log(props);
    useEffect(() => {
        props.getClubTC()
    }, []);
    return (
        <Clubs club={props.clubs}/>
    )
}

let mapStateToProps = state => ({
    clubs: state.club
})

export const ClubsConnected = connect(mapStateToProps, {getClubTC})(ClubsContainer)