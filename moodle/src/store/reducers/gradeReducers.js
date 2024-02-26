import axios from 'axios';

const GET_GRADES = 'GET-GRADES';

const localStore = {
    grades: []
};

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/'
})


export const GradesReducers = (state = localStore, action) => {
    switch (action.type) {
        case GET_GRADES:
            return {
                ...state,
                grades: action.data
            };

        default:
            return state;
    }
};
const getGradesAC = data => ({type: GET_GRADES, data})

export const getGradeTC = (id) => async (dispatch) => {
    try {
        let response = await instance.get(`create/generalgrade?student=${id}`);
        let data = response.data;

        if (Array.isArray(data)) {
            let promises = data.map(async (item) => {
                let resp = await instance.get(`/generalgrade/${item.id}`);
                return resp.data;
            });

            let grades = await Promise.all(promises);

            dispatch(getGradesAC(grades));
        } else {
            let resp = await instance.get(`/generalgrade/${data.id}`);
            dispatch(getGradesAC([resp.data]));
        }
    } catch (error) {
        console.error('Error fetching grades:', error);
    }
};




