import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {thunk} from 'redux-thunk'
import { AuthReducers } from "./reducers/authReducers";
import { CourseReducers } from "./reducers/taskReducers";
import { ClubReducers } from "./reducers/clubReducers";
import { GradesReducers } from "./reducers/gradeReducers";

let reducers = combineReducers({
    auth: AuthReducers,
    course: CourseReducers,
    club: ClubReducers,
    grades: GradesReducers,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk) ));

export default store;