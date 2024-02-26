import axios from 'axios';

const GET_CLUB = 'GET-CLUB';

const localStore = {
    data: []
};

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/'
})


export const ClubReducers = (state = localStore, action) => {
    switch (action.type) {
        case GET_CLUB:
            return {
                ...state,
                data: [...state.data, action.data]
            };

        default:
            return state;
    }
};
const getClubAC = data => ({type: GET_CLUB, data})

export const getClubTC = () => async dispatch => {
    let response = await instance.get(`/create/club`);
    dispatch(getClubAC(response.data))
};



