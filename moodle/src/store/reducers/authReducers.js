import axios from 'axios';

const REGISTER_USER = 'REGISTER-USER';
const SET_TOKEN = 'SET-TOKEN';
const LOGIN_STUDENT = 'LOGIN-STUDENT'
const GET_UNIVERSITY = 'GET-UNIVERSITY'
const GET_GROUP = 'GET-GROUP'
const CLUB_STUDENT = 'CLUB-STUDENT'
const CHANGE_USER_DATA = 'CHANGE-USER-DATA'
const GROUP_DATA = "GROUP-DATA"
const STUDENT_DATA = "STUDENT-DATA"
const LOGOUT_USER = 'LOGOUT-USER';

const localStore = {
    userData: JSON.parse(localStorage.getItem('data')) || [],
    data: JSON.parse(localStorage.getItem('userData')) || [],
    token: [],
    uniData: [],
    groupData: [],
    teacherGroupData: [],
    uniqueStudentData: []
};


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/'
})

export const AuthReducers = ( state = localStore, action) => {
    switch(action.type) {
        case LOGOUT_USER:
            localStorage.removeItem('userData');
            localStorage.removeItem('data');
            return {
                ...state,
                userData: [],
                token: [],
                data: [],
            };
        case REGISTER_USER:
            return {
                ...state,
                data: action.data
            }
        
        case LOGIN_STUDENT:
            return {
                ...state,
                userData: action.userData,
                data:action.data
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.data
            }

        case CLUB_STUDENT:
            return {
                ...state,
                userData: action.userData
            }

        case GET_UNIVERSITY:
            return {
                ...state,
                uniData: action.data
            }

        case GET_GROUP:
            return {
                ...state,
                groupData: action.data
            }

        case CHANGE_USER_DATA:
            return {
                ...state,
                data: action.data
            }
        
        case GROUP_DATA:
            return {
                ...state,
                teacherGroupData: action.data
            }
        
        case STUDENT_DATA: 
            return {
                ...state,
                uniqueStudentData: action.data
            }

        default:
            return state
    }
}

const logoutUserAC = () => ({ type: LOGOUT_USER });
const getUniversityAC = data => ({type: GET_UNIVERSITY, data})
const setTokenAC = data => ({type: SET_TOKEN, data: data});
const loginStudentAC = (data, userData) => ({type: LOGIN_STUDENT, userData: userData, data: data});
const changeStudentAC = (data) => ({type: CHANGE_USER_DATA,  data: data});
const clubAC = (userData) => ({type: CLUB_STUDENT, userData: userData})
const getGroupAC = data => ({type: GET_GROUP, data: data})
const groupDataAC = data => ({type: GROUP_DATA, data: data})
const getStudentDataAC = data => ({type: STUDENT_DATA, data: data})


export const registerUserTC = (data, type) => async dispatch => {
    console.log(data);
        let dataForUser = {
            'email': data['email'],
            'username': data['username'],
            'password': data['password']
        }
        let response = await instance.post('auth/users/', dataForUser);
        setTimeout(async () => {
            let dataForStudent = {
                'first_name': data['first_name'],
                'last_name': data['last_name'],
                'year': data['year'],
                'major': data['major'],
                'birth_date': data['birth_date'],
                'user': response.data.id,
                'gender': data['gender'],
                'university': data['universityId'],
                'phone_number': data['phone'],
                'address': data['address']
            }
            let resp = await instance.post(`create/${type}`, dataForStudent)
            localStorage.setItem('userData', JSON.stringify(resp.data));
            localStorage.setItem('data', JSON.stringify(response.data))
            localStorage.setItem('token', response.data.access);

            dispatch(loginStudentAC(resp.data, response.data))
        })
};

export const loginStudentTC = data => async dispatch => {
    let response = await instance.post('auth/token/', data);
    dispatch(setTokenAC(response.data.access));
    setTimeout(async () => {
        let headers = {'Authorization': `Bearer ${response.data.access}`}
        let getToken = await instance.get('auth/users/me/', {headers: headers})
        let getProfile = await instance.get(`create/student?user=${getToken.data.id}`)
        let getProfileData = await instance.get(`student/${getProfile.data[0].id}`)
        console.log(getProfileData.data);
        localStorage.setItem('userData', JSON.stringify(getProfileData.data));
        localStorage.setItem('data', JSON.stringify(getToken.data))
        localStorage.setItem('token', response.data.access);
        dispatch(loginStudentAC(getProfileData.data, getToken.data))
    })
}

export const loginTeacherTC = data => async dispatch => {
    let response = await instance.post('auth/token/', data)
    dispatch(setTokenAC(response.data.access))
    setTimeout(async () => {
        let headers = {'Authorization': `Bearer ${response.data.access}`}
        let getToken = await instance.get('auth/users/me/', {headers: headers})
        let getProfile = await instance.get(`create/teacher?user=${getToken.data.id}`)
        let getProfileData = await instance.get(`teacher/${getProfile.data[0].id}`)
        console.log(getProfileData.data);
        localStorage.setItem('userData', JSON.stringify(getProfileData.data));
        localStorage.setItem('data', JSON.stringify(getToken.data))
        localStorage.setItem('token', response.data.access);
        dispatch(loginStudentAC(getProfileData.data, getToken.data))
    })
}

export const getUniversityTC = () => async dispatch => {
    let response = await instance.get('create/university')
    dispatch(getUniversityAC(response.data))
}

export const getTeacherGroupTC = id => async dispatch => {
    try {
        let response = await instance.get(`/create/group?teacher=${id}`);
        let data = response.data;

        if (Array.isArray(data)) {
            let promises = data.map(async (item) => {
                let resp = await instance.get(`/group/${item.id}`);
                return resp.data;
            });

            let grades = await Promise.all(promises);

            dispatch(getGroupAC(grades));
        } else {
            let resp = await instance.get(`/generalgrade/${data.id}`);
            dispatch(getGroupAC([resp.data]));
        }
    } catch (error) {
        console.error('Error fetching grades:', error);
    }
}




export const joinClubTC = (id, clubId) => async dispatch => {
    let response = await instance.patch(`/student/${id}`, {clubs_in: [clubId]})
    dispatch(clubAC(response.data))
}

export const changeUserData = (token, email) => async dispatch => {
    const response = await instance.patch('auth/users/me/', { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      dispatch(changeStudentAC(response.data));
}

export const getGroupDataTC = (id) => async dispatch => {
    let response = await instance.get(`/group/${id}`)
    dispatch(groupDataAC(response.data))
}

export const getStudentDataTC = (id) => async dispatch => {
    let response = await instance.get(`/student/${id}`)
    dispatch(getStudentDataAC(response.data));
}

export const logoutUserTC = () => async (dispatch) => {
    dispatch(logoutUserAC());
    
};
