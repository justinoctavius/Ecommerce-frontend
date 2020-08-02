const axios = require('axios');
const { PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_REQUEST,        
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL
} = require('../constants/productConstants'); 
const { API} = require('../config');

const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get(API + 'api/products');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: 'Ups something wrong has occurred'})
    }
};

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const {data} = await axios.get(API + 'api/products/' + productId);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    }
    catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: 'We couldn\'t found that Product'})
    }
}

const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
            dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
            const {data} = await axios.delete(API + 'api/products/' + productId, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token
                }
            });
            dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true})
    }
    catch (error) {
        dispatch({type: PRODUCT_DELETE_FAIL, payload: 'We couldn\'t delete that product'})
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});
        const { userSignin: { userInfo } } = getState();
            if(!product._id){
                const {data} = await axios.post(API + 'api/products', product, {
                    headers: {
                        'Authorization': 'Bearer ' + userInfo.token
                    }
                });
                dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
            }else{
                const {data} = await axios.put(API + 'api/products/' + product._id, product, {
                    headers: {
                        'Authorization': 'Bearer ' + userInfo.token
                    }
                });
                dispatch({type: PRODUCT_SAVE_SUCCESS, payload: data});
            }
    }catch (error) {
        dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message})
    }
} 

module.exports = { listProducts, detailsProduct, saveProduct, deleteProduct }