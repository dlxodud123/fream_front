// src/redux/modules/index.js
import { combineReducers } from 'redux';
import userReducer from './user'; // 사용자 리듀서 경로

const rootReducer = combineReducers({
    user: userReducer,

});

export default rootReducer;
