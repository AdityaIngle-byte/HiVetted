import { LOGOUT, USER_PREFS } from "../actions/actionTypes";

let initialState = {
    userPrefs : null
}


export default loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case USER_PREFS:
            return{
                ...state,
                userPrefs : action.userPrefs
            }
        case LOGOUT:
            return{
                ...state
            }
        default:
            return {
                ...state
            };
    }  
}