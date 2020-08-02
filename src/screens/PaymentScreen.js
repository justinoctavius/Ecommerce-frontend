import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentScreen(props) {
    const [paymentMethod, setPaymentMethod] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({paymentMethod}));
        props.history.push('placeorder')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Payment <i className="far fa-credit-card"></i></h2>
                        </li>
                        <li>
                            <div>
                                <input value='paypal' 
                                       type="radio" 
                                       name="paymentMethod" 
                                       id="paymentMethod" 
                                       onChange={e => setPaymentMethod(e.target.value)} />
                                <label htmlFor="address">
                                    <b>Paypal:</b> <i className="fab fa-paypal"></i>
                                </label>
                            </div>
                        </li>
                        <li>
                            <button type="submit" className="button primary">
                                Continue
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    ) 
}