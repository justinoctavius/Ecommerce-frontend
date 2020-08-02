import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import Cookie from 'js-cookie'
import { userSigninReducer, userRegisterReducer } from './reducers/userReducers';
import { categoryListReducer, categorySaveReducer, categoryDeleteReducer } from './reducers/categoryReducers';
import { adminListReducer, adminDeleteReducer } from './reducers/adminReducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {cart: { cartItems, shipping: {}, payment: {} }, userSignin: { userInfo }};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    categoryList: categoryListReducer,
    categorySave: categorySaveReducer,
    categoryDelete: categoryDeleteReducer,
    adminList: adminListReducer,
    adminDelete: adminDeleteReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;