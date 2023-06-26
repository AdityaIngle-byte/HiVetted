import { INTERVIEW_TYPE } from "../actions/actionTypes";

let initialState = {
    interviewType : null
}


export default homeReducer = (state = initialState, action) => {

    switch (action.type) {
        case INTERVIEW_TYPE:
            return{
                ...state,
                interviewType : action.interviewType
            }
        default:
            return {
                ...state
            };
    }
    
}