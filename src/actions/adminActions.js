import { ADMIN_LIST_REQUEST, 
         ADMIN_LIST_SUCCESS, 
         ADMIN_LIST_FAIL,
         ADMIN_DELETE_REQUEST,
         ADMIN_DELETE_SUCCESS,
         ADMIN_DELETE_FAIL } 
from "../constants/adminConstants";
import Axios from "axios";

const listAdmins = () => async (dispatch, getState) => {
    dispatch({type: ADMIN_LIST_REQUEST, payload: {}});
    try {
        const { userSignin: { userInfo } } = getState();
        const {data} = await Axios.get('http://localhost:5000/api/users/getadmins', {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({type: ADMIN_LIST_SUCCESS, payload: data});
    }catch (error) {
        dispatch({ type: ADMIN_LIST_FAIL, payload: 'Error on fetching data'});
    }
}

const deleteAdmins = (adminId) => async (dispatch, getState) => {
    dispatch({type: ADMIN_DELETE_REQUEST, payload: {}});
    try {
        const { userSignin: { userInfo } } = getState();
        const {data} = await Axios.delete('http://localhost:5000/api/users/getAdmins/' + adminId, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        });
        dispatch({type: ADMIN_DELETE_SUCCESS, payload: data});
    }catch (error) {
        dispatch({ type: ADMIN_DELETE_FAIL, payload: 'Error on fetching data'});
    }
}


export {listAdmins, deleteAdmins}