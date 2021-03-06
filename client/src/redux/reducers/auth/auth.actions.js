import axios from 'axios'; 
import AuthActionTypes from './auth.types';
import {setAlert} from '../alert/alert.actions'


//Register User as an action
export const signup = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password}); 
    
    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: AuthActionTypes.SIGNUP_SUCCESS, 
            payload: res.data
        }); 
    // if empty fields call the alert action   
    } catch (err) {
        //{name: "", email: "", password: ""}
        const errors = err.response.data.errors; 
        console.log(errors); 
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: AuthActionTypes.SIGNUP_FAILURE
        })
    }
}
