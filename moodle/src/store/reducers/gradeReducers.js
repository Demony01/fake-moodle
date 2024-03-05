import axios from 'axios';

const GET_GRADES = 'GET-GRADES';
const GET_TASK_DATA = 'GET-TASK-DATA';
const GET_GRADES_BY_ID = 'GET-GRADES-BY-ID';

const localStore = {
    grades: [],
    gradesById: []
};

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/',
});



export const GradesReducers = (state = localStore, action) => {
    switch (action.type) {
        case GET_GRADES:
            return {
                ...state,
                grades: action.data
            };
        case GET_TASK_DATA:
            return {
                ...state,
                taskData: action.data
            }
        case GET_GRADES_BY_ID:
            return {
                ...state,
                gradesById: action.data
            }

        default:
            return state;
    }
};
const getGradesAC = data => ({type: GET_GRADES, data})
const getTaskDataAC = data => ({type: GET_TASK_DATA, data})
const getGradesByIdAC = data => ({type: GET_GRADES_BY_ID, data})

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

export const getTaskDataTC = (courseId, taskId, studentId) => async (dispatch) => {
    try {
        let response = await instance.get(`http://127.0.0.1:8000/api/create/assignment?student=${studentId}&course=${courseId}&hometask=${taskId}`)
        let data = response.data;

        dispatch(getTaskDataAC(data))
        console.log(data);
    } catch {
        console.log('Error');
    }
}


export const getGradeByIdTC123 = (id, userId) => async (dispatch) => {
    try {
        let response = await instance.get(`http://127.0.0.1:8000/api/create/generalgrade?course=${id}&student=${userId}`)
        let data = response.data;

        if (Array.isArray(data)) {
            let promises = data.map(async (item) => {
                let resp = await instance.get(`/generalgrade/${item.id}`);
                return resp.data;
            });

            let grades = await Promise.all(promises);

            dispatch(getGradesByIdAC(grades));
        } else {
            let resp = await instance.get(`/generalgrade/${data.id}`);
            dispatch(getGradesByIdAC([resp.data]));
        }
    } catch {
        console.log('Error');
    }
}