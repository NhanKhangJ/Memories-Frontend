//reducer is the function that accept the state and also accept the action
//And in reducers the state always needs to be equal to something
import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state={authData: null}, action) => {
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return { ...state, authData: action?.data}
        case LOGOUT:    
            localStorage.clear()
            return { ...state, authData: null}
        default:
            return state
    }
}

export default authReducer