import React from 'react';
import './App.css';
//routes
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import CartScreen from './screens/CartScreen';
import ProductsScreen from './screens/ProductsScreen'

import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import Sidebar from './screens/Sidebar';
import CategoryScreen from './screens/CategoryScreen';
import Cookie from 'js-cookie'

function App() {

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }
    const logout = () => {
        Cookie.remove('userInfo');
        Cookie.remove('cartItems');
        window.location.reload()
    }
  return (
    <BrowserRouter>
        <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                    <Link to={'/'}>E-Commerces <i className="fas fa-store-alt"></i></Link>
                </div>
                <div className="header-links">
                    {
                        userInfo ? <>
                                    <Link to={userInfo.isAdmin ? '/products' : ''}><i className={userInfo.isAdmin ? "fa fa-user-cog" : "fa fa-user"}></i> {userInfo.name}</Link>
                                    <a href='' style={{cursor:'pointer'}} onClick={logout}><i className="fas fa-sign-out-alt"></i>Logout</a>
                                    </>
                                : <Link to="/signin"><i className="fa fa-sign-in-alt"></i> Sign In</Link>
                    }
                    <Link to="/cart"><i className="fa fa-shopping-cart"></i> Cart</Link>
                </div>
            </header>
            <aside className="sidebar">
                <i onClick={closeMenu} className="sidebar-close-button secondary fa fa-angle-double-left"></i>
                <Sidebar></Sidebar>
            </aside>
            <main className="main">
                <div className="content">
                    <Route path="/products" component={ProductsScreen} />
                    <Route path="/category/:id" component={CategoryScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/payment" component={PaymentScreen} />
                    <Route path="/shipping" component={ShippingScreen} />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/" exact={true} component={HomeScreen} />
                </div>
            </main>
            <footer className="footer">All right reserved</footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
