const axios = require('axios');
const { API} = require('../config');
const { CATEGORY_LIST_REQUEST, 
         CATEGORY_LIST_SUCCESS, 
         CATEGORY_LIST_FAIL,
         CATEGORY_SAVE_REQUEST,
         CATEGORY_SAVE_SUCCESS,
         CATEGORY_SAVE_FAIL,
         CATEGORY_DELETE_REQUEST,        
         CATEGORY_DELETE_SUCCESS,
         CATEGORY_DELETE_FAIL
        } = require('../constants/categoryConstants'); 

const listCategory = () => async (dispatch) => {
    try {
        dispatch({type: CATEGORY_LIST_REQUEST});
        const {data} = await axios.get(API + 'api/category');
        dispatch({type: CATEGORY_LIST_SUCCESS, payload: data});
    }
    catch (error) {
        dispatch({type: CATEGORY_LIST_FAIL, payload: 'Error on show category'})
    }
};

const deleteCategory = (category) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
            dispatch({type: CATEGORY_DELETE_REQUEST, payload: category});
            const {data} = await axios.delete(API + 'api/category/' + category, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({type: CATEGORY_DELETE_SUCCESS, payload: data, success: true})
    }
    catch (error) {
        dispatch({type: CATEGORY_DELETE_FAIL, payload: 'Category don\'t exists'})
    }
}

const saveCategory = (category) => async (dispatch, getState) => {

        dispatch({type: CATEGORY_SAVE_REQUEST, payload: category});
        const { userSignin: { userInfo } } = getState();
                const {data} = await axios.post(API + 'api/category', {category}, {
                    headers: {
                        'Authorization': 'Bearer ' + userInfo.token

                    }
                });
        if(data){
            dispatch({type: CATEGORY_SAVE_SUCCESS, payload: data, success: true});
        }else{
            dispatch({type: CATEGORY_SAVE_FAIL, payload: 'Error on save Category'})
        }
} 

module.exports = { listCategory, saveCategory, deleteCategory }