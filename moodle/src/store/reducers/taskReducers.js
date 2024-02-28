import axios from 'axios';

const GET_COURSE = 'GET-COURSE';
const GET_COURSES = 'GET-COURSES';
const CLEAR_COURSE = 'CLEAR-COURSE';
const GET_COURSE_ID = 'GET-COURSE-ID';
const SEND_ANSWER = 'SEND-ANSWER';
const GET_GROUP = 'GET-GROUP';

const localStore = {
    data: [],
    courseData: [],
    groupData: [],
    un_courseData: [],
    answer: []
};

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/'
})

export const CourseReducers = (state = localStore, action) => {
    switch (action.type) {
        case GET_COURSE:
            return {
                ...state,
                data: [...state.data, action.data], // Append the new data to the existing array
            };

        case CLEAR_COURSE:
            return {
                ...state,
                data: [], // Clear the course data
            };

        case GET_GROUP:
            return {
                ...state,
                groupData: action.data
            }

        case GET_COURSES:
            return {
                ...state,   
                courseData: action.data
            }

        case GET_COURSE_ID:
            return {
                ...state,
                un_courseData: [...state.data, action.data],
            }

        case SEND_ANSWER:
            return {
                ...state,
                answer: action.data
            }

        default:
            return state;
    }
};

const getCourseAC = data => ({type: GET_COURSE, data});
const getCoursesAC = data => ({type: GET_COURSES, data})
const getCourseByIdAC = data => ({type: GET_COURSE_ID, data})
const getGroupAC = data => ({type: GET_GROUP, data})
const clearCourseAC = () => ({type: CLEAR_COURSE});
const sendAnswerAC = data => ({type: SEND_ANSWER, data});

export const getCourseTC = (id) => async (dispatch) => {
    try {
        dispatch(clearCourseAC());

        const groupResponses = await instance.get(`/create/group?students=${id}`);

        if (groupResponses.data.length > 0) {
            dispatch(getGroupAC(groupResponses.data))
            const group_id = groupResponses.data[0].id;

            const courseResponse = await instance.get(`/group/${group_id}`);
            const courses = courseResponse.data.course;
            console.log(courses);

            for (let i = 0; i < courses.length; i++) {
                const resp = await instance.get(`course/${courses[i].id}`);
                dispatch(getCourseAC(resp.data));
            }
        }
    } catch (error) {
        console.error('Error fetching course data:', error);
    }
};

export const getCoursesTC = (id) => async (dispatch) => {
    try {
        let response = await instance.get(`/create/course?students=${id}`);
        let ids = response.data;

        if (Array.isArray(ids)) {
            let promises = ids.map(async (courseId) => {
                let resp = await instance.get(`course/${courseId.id}`);
                return resp.data;
            });

            let courses = await Promise.all(promises);

            dispatch(getCoursesAC(courses));
        } else {
            let resp = await instance.get(`course/${ids}`);
            dispatch(getCoursesAC([resp.data]));
        }
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
};

export const GetCourseByIdTC = id => async (dispatch) => {
    let response = await instance.get(`course/${id}`)
    dispatch(getCourseByIdAC(response.data))
}

export const SendAnswerTC = (data) => async (dispatch) => {
    const headers = {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data`,
    }
    console.log(data);
    let response = await instance.post('create/assignment', data, headers)
    console.log(response.data);
    dispatch(sendAnswerAC(response.data))
}
