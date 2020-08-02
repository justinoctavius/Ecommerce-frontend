import { ADMIN_DELETE_REQUEST, 
        ADMIN_DELETE_SUCCESS, 
        ADMIN_DELETE_FAIL, 
        ADMIN_LIST_REQUEST, 
        ADMIN_LIST_SUCCESS, 
        ADMIN_LIST_FAIL } from "../constants/adminConstants";

function adminListReducer(state={}, action){
    switch(action.type){
        case ADMIN_LIST_REQUEST:
            return {loading: true};
        case ADMIN_LIST_SUCCESS:
            return {loading: false, users: action.payload};
        case ADMIN_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function adminDeleteReducer(state = {}, action) {
    switch (action.type){
        case ADMIN_DELETE_REQUEST:
            return {loading: true, users: {}};
        case ADMIN_DELETE_SUCCESS:
            return {loading: false, users: action.payload, success: true };
        case ADMIN_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export {adminListReducer, adminDeleteReducer }