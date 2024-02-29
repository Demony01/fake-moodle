import axios from 'axios';

const REGISTER_USER = 'REGISTER-USER';
const SET_TOKEN = 'SET-TOKEN';
const LOGIN_STUDENT = 'LOGIN-STUDENT'
const GET_UNIVERSITY = 'GET-UNIVERSITY'
const GET_GROUP = 'GET-GROUP'
const CLUB_STUDENT = 'CLUB-STUDENT'

const localStore = {
    userData: [],
    data: [],
    uniData: [],
    groupData: []
};

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    },
});

export const AuthReducers = ( state = localStore, action) => {
    switch(action.type) {
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

        default:
            return state
    }
}

const getUniversityAC = data => ({type: GET_UNIVERSITY, data})
const setTokenAC = data => {
    // Сохранение токена в localStorage
    localStorage.setItem('token', data);

    // Возвращаем объект с типом действия и данными
    return { type: SET_TOKEN, data: data };
};
const loginStudentAC = (data, userData) => ({type: LOGIN_STUDENT, userData: userData, data: data});
const clubAC = (userData) => ({type: CLUB_STUDENT, userData: userData})
const getGroupAC = data => ({type: GET_GROUP, data: data})


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
            dispatch(loginStudentAC(resp.data, response.data))
        })
};

export const loginStudentTC = data => async dispatch => {
    try {
        // Отправка запроса для получения токена
        let response = await instance.post('auth/token/', data);
        dispatch(setTokenAC(response.data.access));

        // Сохранение токена в localStorage
        localStorage.setItem('token', response.data.access);

        // Получение информации о пользователе
        let headers = {'Authorization': `Bearer ${response.data.access}`};
        let getToken = await instance.get('auth/users/me/', {headers: headers});

        // Получение профиля студента
        let getProfile = await instance.get(`create/student?user=${getToken.data.id}`);
        let getProfileData = await instance.get(`student/${getProfile.data[0].id}`);

        // Диспатч акции с данными о пользователе и профиле
        dispatch(loginStudentAC(getProfileData.data, getToken.data));
    } catch (error) {
        console.error('Login failed:', error);
    }
};


// Добавим новое действие для проверки токена при загрузке страницы
export const checkTokenOnLoad = () => async dispatch => {
    try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            // Если токен найден в localStorage, устанавливаем его в axios
            instance.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

            // Получение информации о пользователе
            let headers = {'Authorization': `Bearer ${storedToken}`};
            let getToken = await instance.get('auth/users/me/', {headers: headers});

            // Получение профиля студента
            let getProfile = await instance.get(`create/student?user=${getToken.data.id}`);
            let getProfileData = await instance.get(`student/${getProfile.data[0].id}`);

            // Диспатч акции с данными о пользователе и профиле
            dispatch(loginStudentAC(getProfileData.data, getToken.data));
        }
    } catch (error) {
        console.error('Error checking token on page load:', error);
    }
};



export const loginTeacherTC = data => async dispatch => {
    let response = await instance.post('auth/token/', data)
    dispatch(setTokenAC(response.data.access))
    setTimeout(async () => {
        let headers = {'Authorization': `Bearer ${response.data.access}`}
        let getToken = await instance.get('auth/users/me/', {headers: headers})
        let getProfile = await instance.get(`create/teacher?user=${getToken.data.id}`)
        let getProfileData = await instance.get(`teacher/${getProfile.data[0].id}`)
        console.log(getProfileData.data);
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
