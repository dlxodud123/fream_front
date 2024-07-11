// // src/redux/modules/user.js

// // 초기 상태
// const initialState = {
//     user: null,
//     isLoggedIn: false,
// };

// // 액션 타입
// const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
// const LOGOUT = 'user/LOGOUT';

// // 액션 생성자
// export const loginSuccess = (user) => ({
//     type: LOGIN_SUCCESS,
//     payload: user,
// });

// export const logout = () => ({
//     type: LOGOUT,
// });

// // 리듀서
// const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 user: action.payload,
//                 isLoggedIn: true,
//             };
//         case LOGOUT:
//             return {
//                 ...state,
//                 user: null,
//                 isLoggedIn: false,
//             };
//         default:
//             return state;
//     }
// };

// export default userReducer;
