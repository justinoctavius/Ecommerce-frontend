import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

function CartScreen(props) {
    
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const productId = props.match.params.id;
    
    const qty = Number(props.location.search.split("=")[1]);
    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    
    
    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    }
    
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [])



    return (
        <div className="cart">
            <div className="hover pointer">
                <Link to={'/'} className="link"><i className="fas fa-arrow-left"></i> Back</Link>
            </div>
            <div className='cart-list'>
                <ul className="cart-list-container">
                    <li>
                        <h3>
                            Shopping Cart <i className="fas fa-shopping-cart"></i>
                        </h3>
                        <div>
                            Price:
                        </div>
                    </li>
                        {
                            cartItems.length === 0 ?
                            <div className="font-5">
                                Cart is empty <i className="far fa-tired"></i>
                            </div>
                            :
                            cartItems.map( item => 
                                <li key={item.product}>
                                    <div className="cart-image">
                                        <img src={item.image} alt='product' />
                                    </div>                                    
                                    <div className="cart-name">
                                        <div>
                                            <div>
                                                <Link to={"/product/" + item.product} className="link">
                                                    {item.name}
                                                </Link>
                                            </div>
                                            Qty: <b className="danger">{item.qty}</b> <i className="hover-danger 
                                                                          pointer 
                                                                          fa fa-trash-alt" 
                                                                onClick={() => removeFromCartHandler(item.product)}>
                                                                Delete
                                                            </i> 
                                        </div>
                                    </div>
                                    <div className="cart-price">
                                        <b>${item.price}</b>
                                    </div>
                                </li>
                            )
                        }
                </ul>
            </div>
            <div className='cart-action'>
                <h3>
                    Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items )
                    :
                    <b className="success">${cartItems.reduce((a, c) => a + c.price * c.qty, 0)} <i className="fas fa-money-bill-wave"></i> </b>
                </h3>
                <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default CartScreen
